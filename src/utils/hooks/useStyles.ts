import { StyleSheet, useWindowDimensions } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@utils/constants';
import { createShadow, responsiveStyles, webStyles } from '@utils/helpers';

interface StyleParams {
  theme: typeof theme;
  insets: EdgeInsets;
  width: number;
  height: number;
  webStyles: typeof webStyles;
  createShadow: typeof createShadow;
  responsive: ReturnType<typeof responsiveStyles>;
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
      webStyles,
      createShadow,
      responsive: responsiveStyles(width),
    });
  };
}
