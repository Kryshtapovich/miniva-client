import { Dimensions, StyleSheet } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@utils/constants';
import { createShadow } from '@utils/helpers';

interface StyleParams {
  theme: typeof theme;
  insets: EdgeInsets;
  width: number;
  height: number;
  createShadow: typeof createShadow;
}

type StyleCallback<T> = (prams: StyleParams) => StyleSheet.NamedStyles<T>;

export function withStyles<T>(styles: StyleCallback<T>) {
  return () => {
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get('screen');
    return styles({ theme, insets, width, height, createShadow });
  };
}