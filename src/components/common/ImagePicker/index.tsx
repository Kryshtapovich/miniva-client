import { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { FlashList } from '@shopify/flash-list';

import { Icon } from '../Icon';
import { Image } from '../Image';
import { Spacer } from '../Spacer';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { useStyles } from './styles';

interface Props {
  limit?: number;
  photos: Array<string>;
  onAdd: (photo: string) => void;
  onRemove: (index: number) => void;
}

export function ImagePicker(props: Props) {
  const { photos, onAdd, onRemove } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = useStyles();

  const togglePhotos = async (
    callback: (options: ImageLibraryOptions) => Promise<ImagePickerResponse>,
  ) => {
    const { assets } = await callback({
      mediaType: 'photo',
      includeBase64: true,
    });
    setIsModalOpen(false);
    if (assets) {
      const { base64 } = assets[0];
      onAdd('data:image/png;base64,' + base64);
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View>
        <Image uri={item} style={{ height: 150, borderRadius: 16 }} />
        <Pressable style={styles.iconContainer} onPress={onRemove.bind(null, index)}>
          <Icon set={'FontAwesome5'} name={'trash'} size={20} style={styles.trashIcon} />
        </Pressable>
      </View>
    );
  };

  const renderSeparator = () => {
    return <Spacer horizontal={'xs'} />;
  };

  const renderFooter = () => {
    return (
      <Pressable
        onPress={setIsModalOpen.bind(null, !isModalOpen)}
        style={[styles.button, !!photos.length && styles.notEmpty]}
      >
        <Icon set={'Feather'} name={'camera'} size={40} style={styles.cameraIcon} />
      </Pressable>
    );
  };

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
      <Modal isVisible={isModalOpen} onClose={setIsModalOpen.bind(null, false)}>
        <View>
          <Button label="Take a photo" onPress={togglePhotos.bind(null, launchCamera)} />
          <Spacer vertical={'s'} />
          <Button
            label="Open photo library"
            onPress={togglePhotos.bind(null, launchImageLibrary)}
          />
        </View>
      </Modal>
    </>
  );
}
