import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  button: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.green,
    height: 150,
  },
  notEmpty: {
    marginLeft: theme.spacing.s,
  },
  image: {
    borderRadius: theme.radius.m,
    height: 150,
  },
  iconContainer: {
    position: 'absolute',
    right: theme.spacing.m,
    bottom: theme.spacing.m,
  },
  trashIcon: {
    color: theme.colors.error,
  },
  cameraIcon: {
    color: theme.colors.white,
  },
}));
