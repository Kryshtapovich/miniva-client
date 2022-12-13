import { ImageStyle, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Image, Spacer, Typography } from '@components/common';
import { RouteNames } from '@navigation';
import { Chat, User } from '@models';

import { useStyles } from './styles';

interface Props {
  user: User;
  chat: Chat;
}

export function ChatCard(props: Props) {
  const { chat, user } = props;
  const { username } = user;
  const { last_message, car, other_user } = chat;
  const { attached_photo, content, from_user, to_user } = last_message;

  const { navigate } = useNavigation();

  const gotToChat = () => {
    navigate(RouteNames.chat, {
      carId: car.id,
      sender: from_user.username,
      recipient: to_user.username,
    });
  };

  const styles = useStyles();

  const getUserInfo = () => {
    const user = from_user.username === username ? 'Me' : from_user.username;
    const message = content || (attached_photo ? 'image' : '');
    return `${user}: ${message}`;
  };

  return (
    <Pressable style={styles.container} onPress={gotToChat}>
      <Image uri={car.car_photos[0]} style={styles.image as ImageStyle} />
      <Spacer horizontal={'s'} />
      <View>
        <Typography text={`${car.manufacturer_name} ${car.model}`} />
        <Typography text={getUserInfo()} numberOfLines={1} style={styles.user} />
      </View>
      <Spacer flex />
      <Typography text={other_user.username} />
    </Pressable>
  );
}
