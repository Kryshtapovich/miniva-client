import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistData = async <T>(key: string, data: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getPersistedData = async <T>(key: string) => {
  const strObj = await AsyncStorage.getItem(key);
  return strObj ? (JSON.parse(strObj) as T) : null;
};

export const removePersistedData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
