import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  button: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.green,
  },
  notEmpty: {
    marginLeft: theme.spacing.s,
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
