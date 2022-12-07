import { StyleSheet, useWindowDimensions } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@utils/constants';
import { createShadow, responsiveStyles } from '@utils/helpers';

interface StyleParams {
  theme: typeof theme;
  insets: EdgeInsets;
  width: number;
  height: number;
  responsive: ReturnType<typeof responsiveStyles>;
  createShadow: typeof createShadow;
}

type StyleCallback<T> = (params: StyleParams) => StyleSheet.NamedStyles<T>;

export function withStyles<T>(styles: StyleCallback<T>): () => StyleSheet.NamedStyles<T> {
  return () => {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    return styles({
      theme,
      insets,
      width,
      height,
      createShadow,
      responsive: responsiveStyles(width),
    });
  };
}
