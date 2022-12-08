import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets }) => ({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: theme.colors.white,
    paddingTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    borderTopLeftRadius: theme.radius.m,
    borderTopRightRadius: theme.radius.m,
    paddingBottom: insets.bottom || theme.spacing.m,
  },
  handleContainer: {
    alignItems: 'center',
  },
  handle: {
    height: 8,
    width: 100,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.radius.m,
  },
}));
