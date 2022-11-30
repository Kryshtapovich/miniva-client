import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  text: {
    textAlign: 'right',
    fontSize: 14,
    marginTop: theme.spacing.xs,
  },
  hidden: {
    display: 'none',
  },
}));
