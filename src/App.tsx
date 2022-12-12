import { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import { observer } from 'mobx-react-lite';

import { MessageContainer } from '@components/common';
import { Navigator } from '@navigation';
import { theme } from '@utils/constants';
import { getPersistedData } from '@utils/helpers';
import { useStore } from '@store';
import { User } from '@models';
import { useApi } from '@api';

function Component() {
  const { userStore } = useStore();
  const { init, isAuthorized } = userStore;

  useApi();

  useLayoutEffect(() => {
    getPersistedData<User>('user')
      .then(init)
      .then(() => SplashScreen?.hide());
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
      <Navigator isAuthorized={isAuthorized} />
      <MessageContainer />
    </SafeAreaProvider>
  );
}

export const App = observer(Component);
