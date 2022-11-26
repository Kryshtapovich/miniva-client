import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
  },
  year: {
    fontFamily: theme.font.family.GilroyBold,
  },
  mainInfo: {
    fontSize: theme.font.size.l,
    fontFamily: theme.font.family.GilroyBold,
  },
  image: {
    height: 300,
    borderRadius: theme.radius.m,
  },
}));
