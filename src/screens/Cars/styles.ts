import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, responsive }) => ({
  container: {
    ...responsive({ web: { marginLeft: 100 } }),
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    bottom: theme.spacing.m,
  },
  hidden: {
    display: 'none',
  },
}));
