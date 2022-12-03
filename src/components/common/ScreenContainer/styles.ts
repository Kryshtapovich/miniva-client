import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  paddings: {
    padding: theme.spacing.m,
  },
}));
