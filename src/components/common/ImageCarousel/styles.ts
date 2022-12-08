import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    width: 300,
    height: 300,
  },
  button: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  left: {
    left: theme.spacing.m,
  },
  right: {
    right: theme.spacing.m,
  },
}));
