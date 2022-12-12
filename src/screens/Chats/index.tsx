import { ImageStyle, Pressable, RefreshControl, View } from 'react-native';

import { observer } from 'mobx-react-lite';
import { useStore } from '@store';
import { useState } from 'react';
import { Divider, Image, ScreenContainer, Spacer, Spinner, Typography } from '@components/common';
import { FlashList } from '@shopify/flash-list';
import { Chat } from '@models';
import { useStyles } from './styles';
import { theme } from '@utils/constants';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@navigation';
import { useScreenEnter } from '@utils/hooks';

function Component() {
  const { chatsStore, userStore } = useStore();
  const { user } = userStore;
  const { chats, getUserChats, loading } = chatsStore;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { navigate } = useNavigation();

  useScreenEnter(() => {
    getUserChats();
  }, []);

  const styles = useStyles();

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await getUserChats();
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderChat = ({ item }: { item: Chat }) => {
    const { last_message, car, other_user } = item;

    const { car_photos, manufacturer_name, model } = car;
    const { content, from_user, to_user } = last_message;

    const gotToChat = () => {
      navigate(RouteNames.chat, {
        carId: car.id,
        sender: from_user.username,
        recipient: to_user.username,
      });
    };

    return (
      <Pressable style={styles.chat} onPress={gotToChat}>
        <Image uri={car_photos[0]} style={styles.image as ImageStyle} />
        <Spacer horizontal={'s'} />
        <View>
          <Typography text={`${manufacturer_name} ${model}`} />
          <Typography
            text={`${from_user.username === user?.username ? 'Me' : from_user.username}: ${
              content || 'image.png'
            }`}
            numberOfLines={1}
            style={styles.user}
          />
        </View>
        <Spacer flex />
        <Typography text={other_user.username} />
      </Pressable>
    );
  };

  const renderSeparator = () => {
    return <Divider vertical={'s'} />;
  };

  return (
    <ScreenContainer containerStyle={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <FlashList
          data={chats}
          renderItem={renderChat}
          estimatedItemSize={20}
          ItemSeparatorComponent={renderSeparator}
          refreshControl={
            <RefreshControl
              onRefresh={refresh}
              refreshing={isRefreshing}
              colors={[theme.colors.orange]}
              tintColor={theme.colors.orange}
            />
          }
        />
      )}
    </ScreenContainer>
  );
}

export const ChatsScreen = observer(Component);
