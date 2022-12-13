import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  left: {
    backgroundColor: theme.colors.lightGray,
  },
  right: {
    backgroundColor: theme.colors.green,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
