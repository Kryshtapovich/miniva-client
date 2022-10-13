import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, createShadow }) => ({
  container: {
    borderRadius: theme.radius.m,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    ...createShadow({ width: 0, height: 3, elevation: 7 }),
  },
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
  },
  mainInfo: {
    fontSize: theme.font.size.m,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.radius.m,
  },
}));
