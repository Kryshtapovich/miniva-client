import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    width: 45,
    borderRadius: 30,
  },
}));
