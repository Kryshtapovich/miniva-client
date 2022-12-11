import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, height, webStyles }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: theme.spacing.m,
    ...webStyles({
      gap: theme.spacing.l + 'px',
    }),
  },
  empty: {
    paddingVertical: height / 3,
  },
}));
