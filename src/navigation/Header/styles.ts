import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets, createShadow, responsive }) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: insets.top || theme.spacing.m,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.white,
    ...responsive({
      web: {
        marginLeft: 95,
      },
      mobile: {
        borderBottomLeftRadius: theme.radius.l,
        borderBottomRightRadius: theme.radius.l,
        ...createShadow({ width: 0, height: 3, elevation: 7 }),
      },
    }),
  },
  text: {
    fontSize: theme.font.size.l,
    fontFamily: theme.font.family.GilroyBold,
  },
  backButton: {
    position: 'absolute',
    left: theme.spacing.m,
    bottom: theme.spacing.m,
  },
  hidden: {
    display: 'none',
  },
}));
