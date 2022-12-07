import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: theme.font.size.xl,
  },
  form: {
    width: '95%',
    maxWidth: 500,
  },
  footer: {
    flexDirection: 'row',
  },
  signUp: {
    color: theme.colors.blue,
    textDecorationLine: 'underline',
  },
}));
