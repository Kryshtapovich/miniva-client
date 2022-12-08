import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  images: Array<string>;
  style?: StyleProp<ViewStyle>;
}

export type Params = () => { ImageList: (props: Props) => JSX.Element };
