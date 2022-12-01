import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  item: {
    marginHorizontal: theme.spacing.m,
  },
  placeholder: {
    marginHorizontal: theme.spacing.m,
  },
}));
