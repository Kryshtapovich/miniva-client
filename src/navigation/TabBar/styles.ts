import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, insets, width, createShadow }) => ({
  container: {
    width,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radius.l,
    borderTopRightRadius: theme.radius.l,
    paddingTop: theme.spacing.m,
    paddingBottom: insets.bottom || theme.spacing.s,
    ...createShadow({ height: 0, width: -3, elevation: 7 }),
  },
  item: {
    alignItems: 'center',
  },
  focused: {
    color: theme.colors.orange,
  },
}));
