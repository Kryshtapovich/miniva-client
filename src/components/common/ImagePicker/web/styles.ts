import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, width }) => ({
  button: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.green,
    width: width / 3,
    maxWidth: 300,
  },
  notEmpty: {
    marginBottom: theme.spacing.m,
  },
  first: {
    marginRight: theme.spacing.s,
  },
  last: {
    marginLeft: theme.spacing.s,
  },
  central: {
    marginHorizontal: theme.spacing.s,
  },
  image: {
    borderRadius: theme.radius.m,
    height: width / 3,
    maxHeight: 300,
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
