import { Platform } from 'react-native';

import { Callback } from './types';

export const { showMessage } = Platform.select<Callback>({
  native: () => require('./show.native'),
  default: () => require('./show.web'),
})();
