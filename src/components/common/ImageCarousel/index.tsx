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

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.button, styles.left]}>
        <IconButton onPress={goBack} icon={{ set: 'Feather', name: 'chevron-left', size: 20 }} />
      </View>
      <>
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
      </>
      <View style={[styles.button, styles.right]}>
        <IconButton
          onPress={goForward}
          icon={{ set: 'Feather', name: 'chevron-right', size: 20 }}
        />
      </View>
    </View>
  );
}
