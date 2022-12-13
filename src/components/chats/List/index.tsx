import { useState } from 'react';
import { Platform, RefreshControl } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Divider, EmptyPlaceholder, Spacer } from '@components/common';
import { theme } from '@utils/constants';
import { Chat, User } from '@models';

import { ChatCard } from '../Card';
import { useStyles } from './styles';

interface Props {
  user: User;
  chats: Array<Chat>;
  onRefresh: () => Promise<void>;
}

export function ChatList(props: Props) {
  const { chats, onRefresh, user } = props;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const styles = useStyles();

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const getChat = ({ item }: { item: Chat }) => {
    return <ChatCard chat={item} user={user} />;
  };

  const getSeparator = () => {
    return <Divider vertical={'s'} />;
  };

  const getOutsideComponent = () => {
    return <Spacer vertical={'s'} />;
  };

  const getEmptyComponent = () => {
    return <EmptyPlaceholder text="No chats found" icon={{ set: 'Entypo', name: 'chat' }} />;
  };

  return (
    <FlashList
      data={chats}
      renderItem={getChat}
      estimatedItemSize={20}
      ItemSeparatorComponent={getSeparator}
      refreshControl={
        <RefreshControl
          onRefresh={refresh}
          refreshing={isRefreshing}
          colors={[theme.colors.orange]}
          tintColor={theme.colors.orange}
        />
      }
      ListFooterComponent={getOutsideComponent}
      ListHeaderComponent={getOutsideComponent}
      ListEmptyComponent={getEmptyComponent}
      showsVerticalScrollIndicator={Platform.OS === 'web'}
      contentContainerStyle={!chats.length ? styles.empty : undefined}
    />
  );
}
