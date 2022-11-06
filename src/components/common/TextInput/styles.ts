import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.m,
    padding: theme.spacing.m,
    fontSize: theme.font.size.m,
    borderColor: theme.colors.lightGray,
    borderWidth: 1,
  },
}));
