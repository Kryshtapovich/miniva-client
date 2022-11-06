import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  error: {
    borderColor: theme.colors.error,
  },
  errorText: {
    textAlign: 'right',
    fontSize: 14,
    marginTop: theme.spacing.xs,
  },
}));
