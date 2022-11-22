import { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';

import { isTokenExpired } from 'miniva-common';

import { Navigator } from '@navigation';
import { theme } from '@utils/constants';
import { configureApi, getToken } from '@utils/helpers';

configureApi();

export function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useLayoutEffect(() => {
    getToken()
      .then((token) => setIsAuthorized(!!token && !isTokenExpired(token)))
      .then(() => SplashScreen.hide());
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
      <Navigator isAuthorized={isAuthorized} />
      <FlashMessage position={'top'} />
    </SafeAreaProvider>
  );
}
