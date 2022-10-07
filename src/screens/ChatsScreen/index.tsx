import { observer } from 'miniva-common';

import { SafeAreaView } from 'react-native';

function Component() {
  return <SafeAreaView></SafeAreaView>;
}

export const ChatsScreen = observer(Component);
