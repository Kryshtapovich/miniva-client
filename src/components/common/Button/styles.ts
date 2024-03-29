import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    backgroundColor: theme.colors.green,
    padding: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.m,
  },
  withIcon: {
    flexDirection: 'row',
  },
  icon: {
    color: theme.colors.white,
  },
  label: {
    color: theme.colors.white,
  },
  hidden: {
    display: 'none',
  },
}));
