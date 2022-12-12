import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, responsive }) => ({
  container: {
    ...responsive({
      web: {
        height: 400,
      },
      mobile: {
        height: 300,
      },
    }),
  },
  reviewer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  username: {
    fontSize: theme.font.size.xl,
  },
  email: {
    color: theme.colors.gray,
  },
}));
