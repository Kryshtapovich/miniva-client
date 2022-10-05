import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from '@components/common';

import { TabBar } from './TabBar';
import { RouteNames, RouteParamList } from './types';
import { routes, TabRoute } from './config';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from './Header';

const Stack = createNativeStackNavigator<RouteParamList>();
const BottomTab = createBottomTabNavigator<RouteParamList>();

export const Navigation = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const RootNavigator = () => (
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

const TabBarWrapper = (screens: Array<TabRoute>) => {
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
};
