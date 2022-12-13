import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ height }) => ({
  empty: {
    paddingVertical: height / 3,
  },
}));
