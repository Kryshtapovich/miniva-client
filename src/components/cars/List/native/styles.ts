import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, height }) => ({
  item: {
    marginHorizontal: theme.spacing.m,
  },
  empty: {
    paddingVertical: height / 3,
  },
}));
