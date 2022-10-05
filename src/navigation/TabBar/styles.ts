import { withStyles } from '@utils/hooks';
import { Platform } from 'react-native';

export const useStyles = withStyles(({ theme, insets, width }) => ({
  container: {
    width,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radius.l,
    borderTopRightRadius: theme.radius.l,
    paddingTop: theme.spacing.m,
    paddingBottom: insets.bottom || theme.spacing.s,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowColor: theme.colors.gray,
        shadowOffset: { width: 0, height: -3 },
      },
      android: {
        elevation: 7,
      },
    }),
  },
  item: {
    alignItems: 'center',
  },
  focused: {
    color: theme.colors.orange,
  },
}));
