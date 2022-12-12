import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets }) => ({
  container: {
    flex: 1,
    marginTop: (insets.top || theme.spacing.m) + 2.5 * theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: insets.bottom || theme.spacing.m,
  },
}));
