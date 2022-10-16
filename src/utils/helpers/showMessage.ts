import { theme } from '@utils/constants';
import { showMessage as flashMessage } from 'react-native-flash-message';

interface Params {
  type: 'success' | 'error';
  message: string;
}

export const showMessage = ({ type, message }: Params) => {
  flashMessage({
    type: type === 'error' ? 'danger' : type,
    message,
    icon: 'auto',
    titleStyle: { fontSize: theme.font.size.m, fontWeight: 'bold' },
    color: theme.colors.white,
    backgroundColor: theme.colors[type],
  });
};
