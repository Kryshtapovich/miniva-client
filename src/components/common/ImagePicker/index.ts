import { Platform } from 'react-native';

import { ImagePickerProps } from './types';

type Params = () => { ImagePicker: (props: ImagePickerProps) => JSX.Element };

export const { ImagePicker } = Platform.select<Params>({
  native: () => require('./native'),
  default: () => require('./web'),
})();
