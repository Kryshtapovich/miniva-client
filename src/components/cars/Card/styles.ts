import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme, width, responsive }) => {
  const calculatedWidth = responsive({
    mobile: {
      width: width - 2 * theme.spacing.xl,
    },
  });

  return {
    spacedRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      flexDirection: 'row',
    },
    year: {
      fontFamily: theme.font.family.GilroyBold,
    },
    mainInfo: {
      fontSize: theme.font.size.l,
      fontFamily: theme.font.family.GilroyBold,
    },
    images: {
      ...calculatedWidth,
    },
    image: {
      height: 300,
      borderRadius: theme.radius.m,
      ...calculatedWidth,
    },
  };
});
