import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.font.size.xl,
  },
  form: {
    width: '95%',
  },
  footer: {
    flexDirection: 'row',
  },
  signUp: {
    color: theme.colors.blue,
    textDecorationLine: 'underline',
  },
}));
