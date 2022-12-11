import { ImageStyle, Pressable, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { Icon, Image } from '@components/common';

import { ImagePickerProps } from '../types';
import { useStyles } from './styles';

export function ImagePicker(props: ImagePickerProps) {
  const { photos, onAdd, onRemove } = props;

  const styles = useStyles();

  const togglePhotos = async () => {
    const { assets } = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 0,
      quality: 0.5,
    });
    if (assets) {
      const data = assets.map(({ base64 }) => 'data:image/png;base64,' + base64);
      onAdd(data);
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View>
      <Image uri={item} style={[styles.image as ImageStyle]} />
      <Pressable style={styles.iconContainer} onPress={onRemove.bind(null, index)}>
        <Icon set={'FontAwesome5'} name={'trash'} size={20} style={styles.trashIcon} />
      </Pressable>
    </View>
  );

  const renderFooter = () => (
    <Pressable onPress={togglePhotos} style={styles.button}>
      <Icon set={'Feather'} name={'camera'} size={40} style={styles.cameraIcon} />
    </Pressable>
  );

  return (
    <View style={styles.list}>
      {photos.map((item, index) => renderItem({ item, index }))}
      {renderFooter()}
    </View>
  );
}
