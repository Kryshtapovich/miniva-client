import { ParamListBase, RouteProp } from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RouteParamList {}
  }
}

export enum RouteNames {
  signIn = 'signIn',
  signUp = 'signUp',
  root = 'Root',
  cars = 'Cars',
  car = 'Car',
  favorites = 'Favorites',
  chats = 'Chats',
  chat = 'Chat',
  profile = 'Profile',
}

export type RouteParams<T extends keyof RouteParamList> = RouteProp<RouteParamList, T>;

export interface RouteParamList extends ParamListBase {
  [RouteNames.cars]: undefined;
  [RouteNames.car]: { carId: number };
  [RouteNames.chats]: undefined;
  [RouteNames.chat]: { chatId: number };
  [RouteNames.profile]: undefined;
}
