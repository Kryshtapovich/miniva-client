import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: theme.font.size.l,
  },
}));
