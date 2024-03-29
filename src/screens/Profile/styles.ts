import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ responsive }) => ({
  container: {
    ...responsive({
      web: {
        marginLeft: 100,
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
