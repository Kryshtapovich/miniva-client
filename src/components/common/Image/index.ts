import { Platform } from 'react-native';
import { Props } from './types';

type Params = () => { Image: (props: Props) => JSX.Element };

export const { Image } = Platform.select<Params>({
  native: () => require('./component.native'),
  default: () => require('./component.web'),
})();
