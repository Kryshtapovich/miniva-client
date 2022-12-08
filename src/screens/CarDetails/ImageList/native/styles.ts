import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, height }) => ({
  image: {
    height: height / 2.5,
    borderBottomLeftRadius: theme.radius.m,
    borderBottomRightRadius: theme.radius.m,
  },
}));
