import { ComponentProps } from 'react';

import { Icon } from '@components/common';
import {
  CarDetailsScreen,
  CarsScreen,
  ChatDetailsScreen,
  ChatsScreen,
  ProfileScreen,
  SignInScreen,
  SignUpScreen,
  CarFormScreen,
  CarFilterScreen,
  FavoritesScreen,
} from '@screens';

import { RouteNames, RouteParamList } from './types';
import { LinkingOptions } from '@react-navigation/native';

interface Route {
  name: RouteNames;
  headerShown: boolean;
  canGoBack: boolean;
}

export interface TabRoute extends Route {
  component: () => JSX.Element;
  icon: Pick<ComponentProps<typeof Icon>, 'name' | 'set'>;
}

export interface StackRoute extends Route {
  component: Array<TabRoute> | (() => JSX.Element);
}

export const publicRoutes: Array<StackRoute> = [
  {
    name: RouteNames.signIn,
    headerShown: false,
    canGoBack: false,
    component: SignInScreen,
  },
  {
    name: RouteNames.signUp,
    headerShown: false,
    canGoBack: false,
    component: SignUpScreen,
  },
];

export const privateRoutes: Array<StackRoute> = [
  {
    name: RouteNames.root,
    headerShown: false,
    canGoBack: false,
    component: [
      {
        name: RouteNames.cars,
        headerShown: true,
        canGoBack: false,
        component: CarsScreen,
        icon: { set: 'Ionicons', name: 'car-sport' },
      },
      {
        name: RouteNames.favorites,
        headerShown: true,
        canGoBack: false,
        component: FavoritesScreen,
        icon: { set: 'FontAwesome', name: 'star' },
      },
      {
        name: RouteNames.chats,
        headerShown: true,
        canGoBack: false,
        component: ChatsScreen,
        icon: { set: 'Entypo', name: 'chat' },
      },
      {
        name: RouteNames.profile,
        headerShown: true,
        canGoBack: false,
        component: ProfileScreen,
        icon: { set: 'FontAwesome5', name: 'user-circle' },
      },
    ],
  },
  {
    name: RouteNames.car,
    headerShown: false,
    canGoBack: false,
    component: CarDetailsScreen,
  },
  {
    name: RouteNames.chat,
    headerShown: false,
    canGoBack: false,
    component: ChatDetailsScreen,
  },
  {
    name: RouteNames.carForm,
    headerShown: true,
    canGoBack: true,
    component: CarFormScreen,
  },
  {
    name: RouteNames.carFilter,
    headerShown: false,
    canGoBack: false,
    component: CarFilterScreen,
  },
];

export const linking: LinkingOptions<RouteParamList> = {
  config: {
    screens: {
      [RouteNames.root]: {
        screens: {
          [RouteNames.cars]: 'cars',
          [RouteNames.favorites]: 'favorites',
          [RouteNames.chats]: 'chats',
          [RouteNames.profile]: 'profile',
        },
      } as any,
      [RouteNames.signIn]: 'sign-in',
      [RouteNames.signUp]: 'sign-up',
      [RouteNames.carForm]: 'car-form',
      [RouteNames.carFilter]: 'filter',
      [RouteNames.car]: 'car/:carId',
    },
  },

  prefixes: ['miniva://', 'http://'],
};
