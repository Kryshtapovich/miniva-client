import { useEffect, useMemo, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationState } from '@react-navigation/native';

import { UserRole } from '@models';
import { Icon } from '@components/common';
import { persistData, getPersistedData } from '@utils/helpers';

import { TabBar } from './TabBar';
import { Header } from './Header';
import { RouteNames, RouteParamList } from './types';
import { customerRoutes, reviewerRoutes, publicRoutes, TabRoute, linking } from './config';

const Stack = createNativeStackNavigator<RouteParamList>();
const BottomTab = createBottomTabNavigator<RouteParamList>();

interface Props {
  isAuthorized: boolean;
  role?: UserRole;
}

export function Navigator(props: Props) {
  const { isAuthorized, role } = props;

  const [routes, initialRoute] = useMemo(() => {
    if (!isAuthorized) return [publicRoutes, RouteNames.signIn];

    return role === UserRole.Customer
      ? [customerRoutes, RouteNames.cars]
      : [reviewerRoutes, RouteNames.chats];
  }, [isAuthorized, role]);

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<NavigationState | null>(null);

  useEffect(() => {
    setIsReady(false);
    getPersistedData<NavigationState>('navigation')
      .then(setInitialState)
      .finally(() => setIsReady(true));
  }, []);

  if (!isReady) return null;

  return (
    <NavigationContainer
      linking={linking}
      initialState={initialState || undefined}
      onStateChange={(state) => persistData('navigation', state)}
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
