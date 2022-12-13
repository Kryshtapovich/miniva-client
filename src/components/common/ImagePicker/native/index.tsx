import { useState } from 'react';
import { ImageStyle, Pressable, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Icon, Image, Spacer, Button, Modal } from '@components/common';
import { chooseImages, takePhoto } from '@utils/helpers';

import { ImagePickerProps } from '../types';
import { useStyles } from './styles';

export function ImagePicker(props: ImagePickerProps) {
  const { photos, onAdd, onRemove } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = useStyles();

  const togglePhotos = async (type: 'library' | 'photo') => {
    setIsModalOpen(false);
    setTimeout(async () => {
      await (type === 'photo' ? takePhoto(onAdd) : chooseImages(true, onAdd));
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
      onPress={setIsModalOpen.bind(null, !isModalOpen)}
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
        <Button label="Take a photo" onPress={togglePhotos.bind(null, 'photo')} />
        <Spacer vertical={'s'} />
        <Button label="Open photo library" onPress={togglePhotos.bind(null, 'library')} />
      </Modal>
    </>
  );
}
