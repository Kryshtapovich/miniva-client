import { Platform } from 'react-native';

import { Params } from './types';

export const { ImageViewer } = Platform.select<Params>({
  native: () => require('./native'),
  default: () => require('./web'),
})();
