import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, height, responsive }) => ({
  content: {
    padding: 0,
    backgroundColor: 'none',
    ...responsive({
      web: {
        width: '100%',
        maxHeight: '90vh',
      },
      mobile: {
        maxHeight: '80vh',
        width: '100%',
        maxWidth: '100vw',
      },
    }),
  },
  button: {
    marginLeft: 'auto',
    marginBottom: theme.spacing.s,
  },
  image: {
    ...responsive({
      web: {
        height: height / 1.5,
      },
      mobile: {
        height: height / 2,
      },
    }),
  },
}));
