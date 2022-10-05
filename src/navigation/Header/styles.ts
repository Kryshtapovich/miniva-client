import { Platform } from 'react-native';

import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets }) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: insets.top || theme.spacing.m,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: theme.radius.l,
    borderBottomRightRadius: theme.radius.l,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowColor: theme.colors.gray,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 7,
      },
    }),
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}));
