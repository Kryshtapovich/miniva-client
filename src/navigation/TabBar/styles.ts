import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets, createShadow, responsive }) => ({
  container: {
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    ...responsive({
      web: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignItems: 'center',
        padding: theme.spacing.m,
      },
      mobile: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingTop: theme.spacing.m,
        paddingBottom: insets.bottom || theme.spacing.s,
        borderTopLeftRadius: theme.radius.l,
        borderTopRightRadius: theme.radius.l,
        ...createShadow({ height: 0, width: 3, elevation: 7 }),
      },
    }),
  },
  item: {
    alignItems: 'center',
  },
  focused: {
    color: theme.colors.orange,
  },
}));
