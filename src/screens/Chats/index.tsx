import { SafeAreaView } from 'react-native';

import { observer } from 'mobx-react-lite';

function Component() {
  return <SafeAreaView></SafeAreaView>;
}

export const ChatsScreen = observer(Component);
