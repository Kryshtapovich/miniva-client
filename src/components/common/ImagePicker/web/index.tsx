import { FlatList, ImageStyle, Pressable, View, useWindowDimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { Icon, Image, Spacer } from '@components/common';

import { ImagePickerProps } from '../types';
import { useStyles } from './styles';

export function ImagePicker(props: ImagePickerProps) {
  const { photos, onAdd, onRemove } = props;

  const { width } = useWindowDimensions();
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

  const numColumns = Math.floor(width / 300);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const getStyle = () => {
      switch (index % numColumns) {
        case 0:
          return 'first';
        case numColumns - 1:
          return 'last';
        default:
          return 'central';
      }
    };

    return (
      <View>
        <Image uri={item} style={[styles.image as ImageStyle, styles[getStyle()] as ImageStyle]} />
        <Pressable style={styles.iconContainer} onPress={onRemove.bind(null, index)}>
          <Icon set={'FontAwesome5'} name={'trash'} size={20} style={styles.trashIcon} />
        </Pressable>
      </View>
    );
  };

  const renderSeparator = () => {
    return <Spacer vertical={'s'} />;
  };

  const renderFooter = () => (
    <Pressable onPress={togglePhotos} style={[styles.button, !!photos.length && styles.notEmpty]}>
      <Icon set={'Feather'} name={'camera'} size={40} style={styles.cameraIcon} />
    </Pressable>
  );

  return (
    <FlatList
      key={numColumns}
      data={photos || []}
      numColumns={numColumns}
      renderItem={renderItem}
      ListHeaderComponent={renderFooter}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
    />
  );
}
