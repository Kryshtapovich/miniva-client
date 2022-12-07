import { TextStyle } from 'react-native';

import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.m,
    padding: theme.spacing.m,
    fontSize: theme.font.size.m,
    color: theme.colors.text,
    borderColor: theme.colors.lightGray,
    borderWidth: 1,
  },
  iconContainer: {
    top: theme.spacing.m,
    bottom: theme.spacing.m,
    right: theme.spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    color: theme.colors.gray,
  },
  inputWeb: {
    appearance: 'none',
  } as TextStyle,
}));
