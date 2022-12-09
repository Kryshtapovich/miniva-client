import { useState } from 'react';
import { ImageStyle, Pressable, View } from 'react-native';

import { ImageCarousel, Image, ImageViewer } from '@components/common';

import { Props } from '../types';
import { useStyles } from './styles';

export function ImageList(props: Props) {
  const { images, style } = props;

  const [viewer, setViewer] = useState({ index: 0, visible: false });

  const styles = useStyles();

  const toggleImageViewer = (index?: number) => {
    setViewer((prev) => ({ index: index || prev.index, visible: !prev.visible }));
  };

  const renderImage = ({ item, index }: { item: string; index: number }) => (
    <Pressable onPress={toggleImageViewer.bind(null, index)}>
      <Image uri={item} style={styles.image as ImageStyle} />
    </Pressable>
  );

  return (
    <View style={style}>
      <ImageCarousel images={images} renderImage={renderImage} style={styles.container} />
      <ImageViewer {...viewer} images={images} onClose={toggleImageViewer} />
    </View>
  );
}
