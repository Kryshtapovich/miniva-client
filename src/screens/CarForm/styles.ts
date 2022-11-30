import { withStyles } from '@utils/hooks';
import { Platform } from 'react-native';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    paddingTop: Platform.select({ ios: 60, android: 75 }),
  },
  header: {
    marginBottom: theme.spacing.m,
  },
}));
