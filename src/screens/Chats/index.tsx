import { observer } from 'mobx-react-lite';

import { ScreenContainer, Spinner } from '@components/common';
import { useScreenEnter } from '@utils/hooks';
import { ChatList } from '@components/chats';
import { useStore } from '@store';

import { useStyles } from './styles';

function Component() {
  const { chatsStore, userStore } = useStore();
  const { user } = userStore;
  const { chats, getUserChats, loading } = chatsStore;

  useScreenEnter(() => {
    getUserChats();
  }, []);

  const styles = useStyles();

  if (loading || !user) return <Spinner />;

  return (
    <ScreenContainer containerStyle={styles.container}>
      <ChatList chats={chats} user={user} onRefresh={getUserChats} />
    </ScreenContainer>
  );
}

export const ChatsScreen = observer(Component);
