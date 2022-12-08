import { useState } from 'react';
import { ImageStyle, Platform, Pressable, View } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { FlashList } from '@shopify/flash-list';

import { Icon, Image, Spacer, Button, Modal } from '@components/common';

import { ImagePickerProps } from '../types';
import { useStyles } from './styles';

export function ImagePicker(props: ImagePickerProps) {
  const { photos, onAdd, onRemove } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = useStyles();

  const togglePhotos = async (
    callback: (options: ImageLibraryOptions) => Promise<ImagePickerResponse>,
  ) => {
    setIsModalOpen(false);
    setTimeout(async () => {
      const { assets } = await callback({
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 0,
        quality: 0.5,
      });
      if (assets) {
        const data = assets.map(({ base64 }) => 'data:image/png;base64,' + base64);
        onAdd(data);
      }
    }, 400);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View>
      <Image uri={item} style={styles.image as ImageStyle} />
      <Pressable style={styles.iconContainer} onPress={onRemove.bind(null, index)}>
        <Icon set={'FontAwesome5'} name={'trash'} size={20} style={styles.trashIcon} />
      </Pressable>
    </View>
  );

  const renderSeparator = () => {
    return <Spacer horizontal={'xs'} />;
  };

  const renderFooter = () => (
    <Pressable
      onPress={
        Platform.OS === 'web'
          ? togglePhotos.bind(null, launchImageLibrary)
          : setIsModalOpen.bind(null, !isModalOpen)
      }
      style={[styles.button, !!photos.length && styles.notEmpty]}
    >
      <Icon set={'Feather'} name={'camera'} size={40} style={styles.cameraIcon} />
    </Pressable>
  );

  return (
    <>
      <FlashList
        horizontal
        data={photos || []}
        estimatedItemSize={10}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
      />
      <Modal visible={isModalOpen} setVisible={setIsModalOpen}>
        <Button label="Take a photo" onPress={togglePhotos.bind(null, launchCamera)} />
        <Spacer vertical={'s'} />
        <Button label="Open photo library" onPress={togglePhotos.bind(null, launchImageLibrary)} />
      </Modal>
    </>
  );
}
