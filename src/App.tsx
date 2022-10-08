import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from '@navigation';
import { theme } from '@utils/constants';

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
      <Navigation />
    </SafeAreaProvider>
  );
}
