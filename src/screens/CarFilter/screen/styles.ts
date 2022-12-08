import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetText: {
    color: theme.colors.gray,
  },
}));
