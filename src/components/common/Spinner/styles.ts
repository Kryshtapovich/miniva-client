import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ responsive }) => ({
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...responsive({
      web: {
        marginLeft: 100,
      },
    }),
  },
}));
