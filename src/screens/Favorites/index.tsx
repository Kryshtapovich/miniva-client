import { SafeAreaView } from 'react-native';

import { observer } from 'miniva-common';

function Component() {
  return <SafeAreaView></SafeAreaView>;
}

export const FavoritesScreen = observer(Component);
