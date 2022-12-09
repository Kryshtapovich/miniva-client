import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, responsive }) => ({
  content: {
    ...responsive({
      mobile: {
        maxHeight: '80vh',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.s,
  },
  button: {
    width: 'fit-content',
    alignItems: 'flex-start',
  },
  resetText: {
    textAlign: 'right',
  },
}));
