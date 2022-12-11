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
    bottom: theme.spacing.m,
    ...responsive({
      web: {
        left: '40%',
        right: '40%',
      },
      mobile: {
        left: '25%',
        right: '25%',
      },
    }),
  },
  hidden: {
    display: 'none',
  },
  withFilter: {
    aspectRatio: 1,
    width: theme.spacing.m,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.error,
    position: 'absolute',
    bottom: 2.5 * theme.spacing.l,
    ...responsive({
      web: {
        right: '39.5%',
      },
      mobile: {
        right: '24%',
      },
    }),
  },
}));
