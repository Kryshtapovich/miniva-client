import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  error: {
    borderColor: theme.colors.error,
  },
}));
