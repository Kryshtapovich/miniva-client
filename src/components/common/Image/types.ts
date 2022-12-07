import { ImageStyle, StyleProp } from 'react-native';

export interface Props {
  uri: string;
  fitScreen?: boolean;
  style?: StyleProp<ImageStyle>;
}
