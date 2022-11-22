import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@token';

export const setToken = async (token: string) => {
  await AsyncStorage.setItem(key, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(key);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(key);
};
