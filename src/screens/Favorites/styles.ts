import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ responsive }) => ({
  conatiner: {
    ...responsive({
      web: {
        marginLeft: 100,
      },
    }),
  },
}));
