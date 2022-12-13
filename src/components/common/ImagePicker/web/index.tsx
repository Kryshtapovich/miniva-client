import { ImageStyle, Pressable, View } from 'react-native';

import { Icon, Image } from '@components/common';
import { chooseImages } from '@utils/helpers';

import { ImagePickerProps } from '../types';
import { useStyles } from './styles';

export function ImagePicker(props: ImagePickerProps) {
  const { photos, onAdd, onRemove } = props;

  const styles = useStyles();

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View>
      <Image uri={item} style={[styles.image as ImageStyle]} />
      <Pressable style={styles.iconContainer} onPress={onRemove.bind(null, index)}>
        <Icon set={'FontAwesome5'} name={'trash'} size={20} style={styles.trashIcon} />
      </Pressable>
    </View>
  );

  const renderFooter = () => (
    <Pressable onPress={chooseImages.bind(null, true, onAdd)} style={styles.button}>
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
