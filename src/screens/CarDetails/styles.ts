import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets, height }) => ({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 1,
    position: 'absolute',
    left: theme.spacing.l,
    top: insets.top || theme.spacing.l,
    right: theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: height / 2.5,
    borderBottomLeftRadius: theme.radius.m,
    borderBottomRightRadius: theme.radius.m,
  },
  body: {
    marginVertical: theme.spacing.m,
    marginHorizontal: theme.spacing.s,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.font.size.l,
    fontFamily: theme.font.family.GilroyBold,
  },
  button: {
    position: 'absolute',
    bottom: insets.bottom || theme.spacing.m,
    left: theme.spacing.m,
    right: theme.spacing.m,
  },
}));
