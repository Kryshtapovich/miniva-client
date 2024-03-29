import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: 400,
    maxHeight: '90vh',
    maxWidth: '90vw',
    overflowY: 'auto',
    padding: theme.spacing.m,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.white,
  },
}));
