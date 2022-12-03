import { withStyles } from '@utils/hooks';

export const useStyles = withStyles(({ theme }) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetText: {
    color: theme.colors.gray,
  },
  backButton: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    width: 45,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
  },
  rowPart: {
    flex: 0.5,
  },
}));
