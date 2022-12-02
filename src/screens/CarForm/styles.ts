import { Platform } from 'react-native';

import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets }) => ({
  container: {
    flex: 1,
    marginTop: Platform.select({ ios: 68, android: 40 }),
    paddingHorizontal: theme.spacing.m,
    paddingBottom: insets.bottom || theme.spacing.m,
  },
  header: {
    marginBottom: theme.spacing.m,
  },
}));
