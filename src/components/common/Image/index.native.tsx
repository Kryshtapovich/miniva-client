import { useState } from 'react';
import { StyleProp, Dimensions } from 'react-native';
import FastImage, { OnLoadEvent, ImageStyle } from 'react-native-fast-image';

import { Props } from './types';

interface NativeImageProps extends Omit<Props, 'style'> {
  style?: StyleProp<ImageStyle>;
}

const screenWidth = Dimensions.get('screen').width;

export function Image(props: NativeImageProps) {
  const { uri, style, fitScreen } = props;
  const [aspectRatio, setAspectRatio] = useState(1);

  const onLoad = ({ nativeEvent }: OnLoadEvent) => {
    const { width, height } = nativeEvent;
    width && height && setAspectRatio(width / height);
  };

  return (
    <FastImage
      onLoad={onLoad}
      source={{ uri }}
      style={[fitScreen ? { width: screenWidth } : { aspectRatio }, style]}
      resizeMode={FastImage.resizeMode[fitScreen ? 'stretch' : 'contain']}
    />
  );
}
