import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets }) => ({
  container: {
    flex: 1,
    marginTop: (insets.top || theme.spacing.m) + theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: insets.bottom || theme.spacing.m,
  },
  header: {
    marginBottom: theme.spacing.m,
    marginLeft: 0,
  },
}));
