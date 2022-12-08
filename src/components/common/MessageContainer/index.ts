import { Platform } from 'react-native';

type Params = () => { MessageContainer: () => JSX.Element };

export const { MessageContainer } = Platform.select<Params>({
  native: () => require('./component.native'),
  default: () => require('./component.web'),
})();
