import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: insets.top || theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.white,
  },
  button: {
    position: 'absolute',
    left: 0,
    bottom: theme.spacing.xs,
  },
  car: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.font.size.l,
  },
}));
