import { useState } from 'react';
import { StyleProp } from 'react-native';
import FastImage, { OnLoadEvent, ImageStyle } from 'react-native-fast-image';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export function Image(props: Props) {
  const { uri, style } = props;
  const [aspectRatio, setAspectRatio] = useState(1);

  const onLoad = ({ nativeEvent }: OnLoadEvent) => {
    const { width, height } = nativeEvent;
    width && height && setAspectRatio(width / height);
  };

  return (
    <FastImage
      onLoad={onLoad}
      source={{ uri }}
      style={[{ aspectRatio }, style]}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
}
