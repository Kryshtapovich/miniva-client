import { Dimensions, Image as RNImage } from 'react-native';

import { Props } from './types';

const screenWidth = Dimensions.get('screen').width;

export function Image(props: Props) {
  const { uri, style, fitScreen } = props;

  return (
    <RNImage
      source={{ uri }}
      style={[fitScreen ? { width: screenWidth } : { aspectRatio: 1 }, style]}
    />
  );
}
