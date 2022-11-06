import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    color: theme.colors.text,
    fontSize: theme.font.size.m,
    fontFamily: theme.font.family.Gilroy,
  },
  error: {
    color: theme.colors.error,
  },
}));
