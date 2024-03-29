import { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import { observer } from 'mobx-react-lite';

import { MessageContainer } from '@components/common';
import { getPersistedData } from '@utils/helpers';
import { theme } from '@utils/constants';
import { Navigator } from '@navigation';
import { useStore } from '@store';
import { User } from '@models';
import { useApi } from '@api';

function Component() {
  const { userStore } = useStore();
  const { init, isAuthorized, user } = userStore;

  useApi();

  useLayoutEffect(() => {
    getPersistedData<User>('user')
      .then(init)
      .then(() => SplashScreen?.hide());
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
      <Navigator isAuthorized={isAuthorized} role={user?.role} />
      <MessageContainer />
    </SafeAreaProvider>
  );
}

export const App = observer(Component);
