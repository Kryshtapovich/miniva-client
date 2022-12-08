import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets, width, responsive }) => ({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  webHeader: {
    marginVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  mobileHeader: {
    zIndex: 1,
    position: 'absolute',
    left: theme.spacing.l,
    right: theme.spacing.l,
    top: insets.top || theme.spacing.l,
  },
  images: {
    ...responsive({
      web: {
        width: width / 2,
      },
      mobile: {
        width,
      },
    }),
  },
  body: {
    ...responsive({
      web: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.m,
      },
      mobile: {
        flexDirection: 'column',
      },
    }),
  },
  info: {
    flexGrow: 1,
    ...responsive({
      web: {
        marginLeft: theme.spacing.m,
      },
      mobile: {
        marginVertical: theme.spacing.m,
        marginHorizontal: theme.spacing.s,
      },
    }),
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
