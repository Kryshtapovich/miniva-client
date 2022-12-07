import { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';

import { observer, useStore } from 'miniva-common';

import { Navigator } from '@navigation';
import { theme } from '@utils/constants';
import { getUser } from '@utils/helpers';
import { useApi } from '@utils/hooks';

function Component() {
  const { userStore } = useStore();
  const { init, isAuthorized } = userStore;

  useApi();

  useLayoutEffect(() => {
    getUser()
      .then(init)
      .then(() => SplashScreen?.hide());
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
      <Navigator isAuthorized={isAuthorized} />
      <FlashMessage position={'top'} />
    </SafeAreaProvider>
  );
}

export const App = observer(Component);
