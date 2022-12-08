import { Platform } from 'react-native';
import { Params } from './types';

export const { Modal } = Platform.select<Params>({
  native: () => require('./native'),
  default: () => require('./web'),
})();
