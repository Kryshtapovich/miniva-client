import { ImageStyle, Pressable, View } from 'react-native';

import { ImageCarousel, Image } from '@components/common';

import { Props } from '../types';
import { useStyles } from './styles';

export function ImageList(props: Props) {
  const { images, style } = props;

  const styles = useStyles();

  const renderImage = ({ item, index }: { item: string; index: number }) => (
    <Pressable onPress={() => console.log(index)}>
      <Image uri={item} style={styles.image as ImageStyle} />
    </Pressable>
  );

  return (
    <View style={style}>
      <ImageCarousel images={images} renderImage={renderImage} style={styles.container} />
    </View>
  );
}
