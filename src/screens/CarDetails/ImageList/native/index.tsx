import { useState } from 'react';
import { ImageStyle, Pressable } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Image, ImageViewer, Spacer } from '@components/common';

import { Props } from '../types';
import { useStyles } from './styles';

export function ImageList(props: Props) {
  const { images } = props;

  const [viewer, setViewer] = useState({ index: 0, visible: false });

  const styles = useStyles();

  const toggleImageViewer = (index?: number) => {
    setViewer((prev) => ({ index: index || prev.index, visible: !prev.visible }));
  };

  const renderImage = ({ item, index }: { item: string; index: number }) => (
    <Pressable onPress={toggleImageViewer.bind(null, index)}>
      <Image fitScreen uri={item} style={styles.image as ImageStyle} />
    </Pressable>
  );

  const getSeparator = () => {
    return <Spacer horizontal={'xxs'} />;
  };

  return (
    <>
      <FlashList
        horizontal
        data={images}
        estimatedItemSize={10}
        renderItem={renderImage}
        ItemSeparatorComponent={getSeparator}
        showsHorizontalScrollIndicator={false}
      />
      <ImageViewer {...viewer} images={images} onClose={toggleImageViewer} />
    </>
  );
}
