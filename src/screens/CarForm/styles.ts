import { withStyles } from '@utils/hooks';
import { Platform } from 'react-native';

export const useStyles = withStyles(() => ({
  container: {
    paddingTop: Platform.select({ ios: 60, android: 75 }),
  },
}));
