import { ImageStyle, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Image, Spacer, Modal, IconButton } from '@components/common';

import { ImageViewerProps } from '../types';
import { useStyles } from './styles';

export function ImageViewer(props: ImageViewerProps) {
  const { images, index, onClose, visible } = props;

  const styles = useStyles();

  const renderImage = ({ item }: { item: string }) => {
    return (
      <View onStartShouldSetResponder={() => true}>
        <Image uri={item} style={styles.image as ImageStyle} />
      </View>
    );
  };

  const closeButton = () => {
    return (
      <IconButton
        icon={{ set: 'Feather', name: 'x', size: 20 }}
        onPress={onClose}
        style={styles.button}
      />
    );
  };

  const getSeparator = () => {
    return <Spacer vertical={'s'} />;
  };

  return (
    <Modal visible={visible} setVisible={onClose} contentStyle={styles.content}>
      <FlashList
        data={images}
        renderItem={renderImage}
        initialScrollIndex={index}
        ListHeaderComponent={closeButton}
        ItemSeparatorComponent={getSeparator}
      />
    </Modal>
  );
}
