import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

import { Navigator } from '@navigation';
import { theme } from '@utils/constants';

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
      <Navigator isAuthorized={false} />
      <FlashMessage position={'top'} />
    </SafeAreaProvider>
  );
}
