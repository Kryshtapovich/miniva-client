import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'miniva-common';

const key = '@token';

export const setUser = async (user: User) => {
  await AsyncStorage.setItem(key, JSON.stringify(user));
};

export const getUser = async () => {
  const strObj = await AsyncStorage.getItem(key);
  if (strObj) return JSON.parse(strObj) as User;
  return null;
};

export const removeUser = async () => {
  await AsyncStorage.removeItem(key);
};
