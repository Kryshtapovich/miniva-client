import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.green,
    padding: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.m,
  },
  icon: {
    color: theme.colors.white,
  },
  label: {
    color: theme.colors.white,
  },
}));
