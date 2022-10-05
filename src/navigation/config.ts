import { ComponentProps } from 'react';

import { Icon } from '@components/common';
import {
  CarScreen,
  CarsScreen,
  FavoritesScreen,
  ChatScreen,
  ChatsScreen,
  ProfileScreen,
} from '@screens';

import { RouteNames } from './types';

interface Route {
  name: RouteNames;
  headerShown: boolean;
}

export interface TabRoute extends Route {
  component: () => JSX.Element;
  icon: Pick<ComponentProps<typeof Icon>, 'name' | 'set'>;
}

export interface StackRoute extends Route {
  component: Array<TabRoute> | (() => JSX.Element);
}

export const routes: Array<StackRoute> = [
  {
    name: RouteNames.root,
    headerShown: false,
    component: [
      {
        name: RouteNames.cars,
        headerShown: true,
        component: CarsScreen,
        icon: { set: 'Ionicons', name: 'car-sport' },
      },
      {
        name: RouteNames.favorites,
        headerShown: true,
        component: FavoritesScreen,
        icon: { set: 'FontAwesome', name: 'star' },
      },
      {
        name: RouteNames.chats,
        headerShown: true,
        component: ChatsScreen,
        icon: { set: 'Entypo', name: 'chat' },
      },
      {
        name: RouteNames.profile,
        headerShown: true,
        component: ProfileScreen,
        icon: { set: 'FontAwesome5', name: 'user-circle' },
      },
    ],
  },
  {
    name: RouteNames.car,
    headerShown: false,
    component: CarScreen,
  },
  {
    name: RouteNames.chat,
    headerShown: false,
    component: ChatScreen,
  },
];
