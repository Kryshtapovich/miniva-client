import { NavigationState } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@navigation';

export const persistNavigationState = async (state?: NavigationState) => {
  await AsyncStorage.setItem(key, JSON.stringify(state));
};

export const getNavigationState = async () => {
  const strObj = await AsyncStorage.getItem(key);
  return strObj ? (JSON.parse(strObj) as NavigationState) : undefined;
};
