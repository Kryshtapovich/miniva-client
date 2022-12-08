import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, height, width, responsive }) => {
  const calculatedHeight = responsive({
    web: { height: height / 1.5 },
    mobile: { height: height / 2.5 },
  });

  const calculatedWidth = responsive({
    web: { width: width / 2 },
    mobile: { width },
  });

  return {
    container: {
      width: '100%',
      ...calculatedHeight,
    },
    image: {
      borderRadius: theme.radius.m,
      ...calculatedWidth,
      ...calculatedHeight,
    },
  };
});
