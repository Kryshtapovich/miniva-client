import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Icon } from '@components/common';

import { TabBar } from './TabBar';
import { RouteNames, RouteParamList } from './types';
import { routes, TabRoute } from './config';
import { Header } from './Header';

const Stack = createNativeStackNavigator<RouteParamList>();
const BottomTab = createBottomTabNavigator<RouteParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={RouteNames.cars}>
      {routes.map(({ name, component, headerShown }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={Array.isArray(component) ? TabBarWrapper(component) : component}
          options={{ headerShown, header: (props) => <Header {...props} /> }}
        />
      ))}
    </Stack.Navigator>
  );
}

function TabBarWrapper(screens: Array<TabRoute>) {
  return () => (
    <BottomTab.Navigator tabBar={(props) => <TabBar {...props} />}>
      {screens.map(({ name, component, icon, headerShown }) => (
        <BottomTab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown,
            header: (props) => <Header {...props} />,
            tabBarIcon: (props) => <Icon {...icon} {...props} />,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}
