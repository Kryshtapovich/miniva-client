import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets }) => ({
  footer: {
    textAlign: 'center',
    padding: theme.spacing.m,
    color: theme.colors.white,
    paddingBottom: insets.bottom || theme.spacing.m,
  },
}));
