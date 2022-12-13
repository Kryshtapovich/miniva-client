import { useState, useCallback, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { GiftedChat, Actions, IMessage, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { paymentApi } from '@api';
import { useStore } from '@store';
import { useWebSocket } from '@utils/hooks';
import { ChatHeader } from '@components/chats';
import { Icon, Spinner } from '@components/common';
import { RouteNames, RouteParams } from '@navigation';
import { chooseImages, takePhoto } from '@utils/helpers';
import { ChatEvent, MessageType, UserRole } from '@models';

import { useStyles } from './styles';

function Component() {
  const { params } = useRoute<RouteParams<RouteNames.chat>>();
  const { carId, sender, recipient } = params!;

  const { carsStore, userStore } = useStore();
  const { user } = userStore;
  const { car, getCar } = carsStore;

  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const { connect, disconnect, send } = useWebSocket();

  const styles = useStyles();

  useEffect(() => {
    getCar(carId);

    connect<ChatEvent>(
      `${process.env.WS_URL}/${sender}__${recipient}/?car_id=${carId}&token=${user!.token}`,
      (event) => {
        switch (event.type) {
          case MessageType.Last: {
            const { messages } = event;
            const chatMessages = messages.map<IMessage>(
              ({ id, content, timestamp, from_user, attached_photo }) => ({
                _id: id,
                text: content,
                image: attached_photo,
                createdAt: new Date(timestamp),
                user: { _id: from_user.username },
              }),
            );
            setMessages(chatMessages);
            break;
          }
          case MessageType.Chat: {
            const { message } = event;
            const chatMessage: IMessage = {
              _id: message.id,
              createdAt: new Date(message.timestamp),
              text: message.content,
              image: message.attached_photo,
              user: { _id: message.from_user.username },
            };
            setMessages((prev) => GiftedChat.append(prev, [chatMessage]));
            break;
          }
        }
      },
    );

    return disconnect;
  }, []);

  const onSend = useCallback((messages: Array<IMessage>) => {
    const [message] = messages;
    const payload = {
      type: 'chat_message',
      name: `${sender}__${recipient}`,
      message: message.text,
    };
    send(payload);
  }, []);

  const renderBubble = (bubble: BubbleProps<IMessage>) => {
    return <Bubble {...bubble} wrapperStyle={{ left: styles.left, right: styles.right }} />;
  };

  const renderActions = () => {
    const onImagesLoad = (images: Array<string>) => {
      const [image] = images;
      const { sender, recipient } = params!;

      const payload = {
        type: MessageType.Chat,
        name: `${sender}__${recipient}`,
        message: '',
        attached_photo: image,
      };
      send(payload);
    };

    const onPay = async () => {
      const { redirect_url } = await paymentApi.getPage(carId);
      Linking.openURL(redirect_url);
    };

    const options = Object.assign(
      { 'Choose photo from Library': chooseImages.bind(null, false, onImagesLoad) },
      Platform.OS !== 'web' && { 'Take photo': takePhoto.bind(null, onImagesLoad) },
      user!.role === UserRole.Customer && { Pay: onPay },
    );

    return (
      <Actions
        options={options}
        wrapperStyle={styles.actions}
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
        messages={messages}
        renderAvatar={null as any}
        renderBubble={renderBubble}
        renderActions={renderActions}
        user={{ _id: user!.username }}
        renderLoading={() => <Spinner />}
      />
    </>
  );
}

export const ChatDetailsScreen = observer(Component);
