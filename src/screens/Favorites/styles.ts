import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
