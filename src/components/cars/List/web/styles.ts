import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, height, responsive }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    ...responsive({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    }),
  },
  item: {
    margin: theme.spacing.m,
  },
  empty: {
    paddingVertical: height / 3,
  },
}));
