import { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';

import { isTokenExpired, observer, useStore } from 'miniva-common';

import { Navigator } from '@navigation';
import { theme } from '@utils/constants';
import { configureApi, getUser } from '@utils/helpers';

configureApi();

function Component() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { userStore } = useStore();
  const { user, init } = userStore;

  const checkToken = (token?: string) => {
    setIsAuthorized(!!token && !isTokenExpired(token));
  };

  useLayoutEffect(() => {
    getUser()
      .then((storageUser) => {
        checkToken(storageUser?.token);
        init(storageUser);
      })
      .then(() => SplashScreen.hide());
  }, []);

  useEffect(() => {
    checkToken(user?.token);
  }, [user?.token]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
      <Navigator isAuthorized={isAuthorized} />
      <FlashMessage position={'top'} />
    </SafeAreaProvider>
  );
}

export const App = observer(Component);
