import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(() => ({
  content: {
    padding: 0,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
