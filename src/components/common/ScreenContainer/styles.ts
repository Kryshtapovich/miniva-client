import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
  },
}));
