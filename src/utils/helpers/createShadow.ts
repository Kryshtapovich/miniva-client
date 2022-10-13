import { Platform } from 'react-native';

import { theme } from '@utils/constants';

interface Params {
  width: number;
  height: number;
  elevation: number;
}

export const createShadow = ({ width, height, elevation }: Params) => {
  return Platform.select({
    ios: {
      shadowOpacity: 0.2,
      shadowColor: theme.colors.gray,
      shadowOffset: { width, height },
    },
    android: {
      elevation,
    },
  });
};
