import { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Actions, IMessage, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { useStore } from '@store';
import { RouteNames, RouteParams } from '@navigation';

import { ChatHeader } from './Header';
import { useStyles } from './styles';
import { ChatEvent, MessageType, UserRole } from '@models';
import { Icon, Spinner } from '@components/common';
import { Linking, Platform } from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { paymentApi } from '@api';

let ws: WebSocket | null = null;

function Component() {
  const { params } = useRoute<RouteParams<RouteNames.chat>>();

  const { carsStore, userStore } = useStore();
  const { user } = userStore;
  const { car, getCar } = carsStore;

  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const styles = useStyles();

  useEffect(() => {
    if (params) {
      const { carId, sender, recipient } = params;

      getCar(carId);

      if (user && !ws) {
        ws = new WebSocket(
          `${process.env.WS_URL}/${sender}__${recipient}/?car_id=${carId}&token=${user.token}`,
        );
        ws.onmessage = ({ data }) => {
          const event = JSON.parse(data) as ChatEvent;

          switch (event.type) {
            case MessageType.Last: {
              const { messages } = event;

              setMessages(
                messages.map(({ id, content, timestamp, from_user, attached_photo }) => ({
                  _id: id,
                  text: content,
                  createdAt: new Date(timestamp),
                  image: attached_photo,
                  user: { _id: from_user.username },
                })),
              );
              break;
            }
            case MessageType.Chat: {
              const { message } = event;
              if (message.from_user.username === user.username) return;

              const chatMessage: IMessage = {
                _id: message.id,
                createdAt: new Date(message.timestamp),
                text: message.content,
                user: { _id: message.from_user.username },
              };
              setMessages((prev) => GiftedChat.append(prev, [chatMessage]));
              break;
            }
          }
        };
      }
    }
  }, [params]);

  useEffect(() => {
    return () => {
      ws?.close();
      ws = null;
    };
  }, []);

  const onSend = useCallback((messages: Array<IMessage>) => {
    if (params) {
      const { sender, recipient } = params;
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
      const [message] = messages;
      const payload = {
        type: 'chat_message',
        name: `${sender}__${recipient}`,
        message: message.text,
      };
      ws?.send(JSON.stringify(payload));
    }
  }, []);

  const renderBubble = (bubble: BubbleProps<IMessage>) => {
    return <Bubble {...bubble} wrapperStyle={{ left: styles.left, right: styles.right }} />;
  };

  const renderActions = () => {
    const pickImage = async (
      callback: (options: ImageLibraryOptions) => Promise<ImagePickerResponse>,
    ) => {
      const { assets } = await callback({
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.5,
      });
      if (assets && params && user) {
        const { sender, recipient } = params;
        const [image] = assets;

        const message: IMessage = {
          _id: Math.random(),
          image: 'data:image/png;base64,' + image.base64,
          text: '',
          createdAt: new Date(),
          user: { _id: user?.username },
        };
        setMessages((prev) => GiftedChat.append(prev, [message]));

        const payload = {
          type: 'chat_message',
          name: `${sender}__${recipient}`,
          message: '',
          attached_photo: 'data:image/png;base64,' + image.base64,
        };
        ws?.send(JSON.stringify(payload));
      }
    };

    const options =
      Platform.OS === 'web'
        ? {
            'Choose photo from Library': () => pickImage(launchImageLibrary),
            ...(user?.role === UserRole.Customer
              ? {
                  Pay: () => {
                    params &&
                      paymentApi
                        .getPage(params.carId)
                        .then(({ redirect_url }) => Linking.openURL(redirect_url));
                  },
                }
              : undefined),
            Close: () => {},
          }
        : {
            'Choose photo from Library': pickImage,
            'Take photo': () => pickImage(launchCamera),
            ...(user?.role === UserRole.Customer
              ? {
                  Pay: () => {
                    params &&
                      paymentApi
                        .getPage(params.carId)
                        .then(({ redirect_url }) => Linking.openURL(redirect_url));
                  },
                }
              : undefined),
            Close: () => {},
          };

    return (
      <Actions
        wrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
        options={options}
        icon={() => <Icon set="Entypo" name="dots-three-vertical" size={25} />}
      />
    );
  };

  return (
    <>
      {car && <ChatHeader car={car} />}
      <GiftedChat
        scrollToBottom
        onSend={onSend}
        renderLoading={() => <Spinner />}
        messages={messages}
        user={{ _id: user?.username || 1 }}
        renderBubble={renderBubble}
        renderAvatar={null as any}
        renderActions={renderActions}
      />
    </>
  );
}

export const ChatDetailsScreen = observer(Component);
