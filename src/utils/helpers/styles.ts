import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface Params {
  web?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  mobile?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}

export const responsiveStyles = (width: number) => {
  return ({ web, mobile }: Params) => {
    return (width > 700 ? web : mobile) as object;
  };
};
