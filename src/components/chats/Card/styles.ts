import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, width, responsive }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  user: {
    ...responsive({
      web: {
        maxWidth: width / 2,
      },
      mobile: {
        maxWidth: 150,
      },
    }),
    color: theme.colors.gray,
  },
}));
