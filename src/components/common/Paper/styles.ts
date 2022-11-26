import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, createShadow }) => ({
  container: {
    borderRadius: theme.radius.m,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    ...createShadow({ width: 0, height: 3, elevation: 7 }),
  },
}));
