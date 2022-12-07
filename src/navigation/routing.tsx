import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationState } from '@react-navigation/native';

import { Icon } from '@components/common';
import { persistNavigationState, getNavigationState } from '@utils/helpers';

import { TabBar } from './TabBar';
import { Header } from './Header';
import { RouteNames, RouteParamList } from './types';
import { privateRoutes, publicRoutes, TabRoute, linking } from './config';

const Stack = createNativeStackNavigator<RouteParamList>();
const BottomTab = createBottomTabNavigator<RouteParamList>();

interface Props {
  isAuthorized: boolean;
}

export function Navigator(props: Props) {
  const { isAuthorized } = props;

  const routes = isAuthorized ? privateRoutes : publicRoutes;
  const initialRoute = isAuthorized ? RouteNames.cars : RouteNames.signIn;

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<NavigationState>();

  useEffect(() => {
    setIsReady(false);
    getNavigationState()
      .then(setInitialState)
      .finally(() => setIsReady(true));
  }, []);

  if (!isReady) return null;

  return (
    <NavigationContainer
      linking={linking}
      initialState={initialState}
      onStateChange={persistNavigationState}
    >
      <Stack.Navigator initialRouteName={initialRoute}>
        {routes.map(({ name, component, headerShown, canGoBack }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={Array.isArray(component) ? TabBarWrapper(component) : component}
            options={{
              headerShown,
              title: 'Miniva',
              header: (headerProps) => <Header {...headerProps} canGoBack={canGoBack} />,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabBarWrapper(screens: Array<TabRoute>) {
  return () => (
    <BottomTab.Navigator tabBar={(props) => <TabBar {...props} />}>
      {screens.map(({ name, component, icon, headerShown, canGoBack }) => (
        <BottomTab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown,
            title: 'Miniva',
            header: (props) => <Header {...props} canGoBack={canGoBack} />,
            tabBarIcon: ({ color, ...rest }) => <Icon {...icon} {...rest} style={{ color }} />,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}
