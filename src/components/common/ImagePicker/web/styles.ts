import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, width, webStyles }) => ({
  button: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.green,
    width: width / 3,
    maxWidth: 300,
  },
  list: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...webStyles({
      gap: theme.spacing.m + 'px',
    }),
  },
  image: {
    borderRadius: theme.radius.m,
    height: width / 3,
    width: width / 3,
    maxHeight: 300,
    maxWidth: 300,
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
