import { useRef, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';

import { IconButton, Spacer } from '@components/common';

import { useStyles } from './styles';

interface Props {
  images: Array<string>;
  style?: StyleProp<ViewStyle>;
  renderImage: (item: ListRenderItemInfo<string>) => JSX.Element;
}

export function ImageCarousel(props: Props) {
  const { images, style, renderImage } = props;

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [index, setIndex] = useState(0);
  const ref = useRef<FlashList<string>>(null);

  const styles = useStyles();

  const goBack = () => {
    const targetIndex = index === 0 ? images.length - 1 : index - 1;
    ref.current?.scrollToIndex({ index: targetIndex, animated: true });
    setIndex(targetIndex);
  };

  const goForward = () => {
    const targetIndex = index === images.length - 1 ? 0 : index + 1;
    ref.current?.scrollToIndex({ index: targetIndex, animated: true });
    setIndex(targetIndex);
  };

  const renderSeparator = () => {
    return <Spacer horizontal={'s'} />;
  };

  const getButton = (position: 'left' | 'right') => {
    if (images.length === 1) return null;

    return (
      <IconButton
        onPress={position === 'left' ? goBack : goForward}
        style={[styles.button, styles[position]]}
        icon={{ set: 'Feather', name: `chevron-${position}`, size: 20 }}
      />
    );
  };

  return (
    <View style={[styles.container, style]}>
      {getButton('left')}
      <FlashList
        ref={ref}
        horizontal
        data={images}
        estimatedItemSize={10}
        renderItem={renderImage}
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        onTouchEnd={setScrollEnabled.bind(null, true)}
        onTouchStart={setScrollEnabled.bind(null, false)}
      />
      {getButton('right')}
    </View>
  );
}
