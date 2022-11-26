import { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ImageStyle } from 'react-native-fast-image';

import { FlashList } from '@shopify/flash-list';

import { Car } from 'miniva-common';

import { Image, Paper, Spacer, Typography } from '@components/common';

import { useStyles } from './styles';

interface Props {
  car: Car;
  style?: StyleProp<ViewStyle>;
  toggleFavorite: (id: number) => Promise<void>;
}

function Component(props: Props) {
  const { car, style } = props;
  const { model, price, car_photos } = car;

  const styles = useStyles();

  const renderImage = ({ item }: { item: string }) => {
    return <Image uri={'data:image/png;base64,' + item} style={styles.image as ImageStyle} />;
  };

  const renderSeparator = () => {
    return <Spacer horizontal={'s'} />;
  };

  return (
    <Paper style={style}>
      <View style={styles.spacedRow}>
        <View style={styles.title}>
          <Spacer horizontal={'xs'} />
          <Typography style={styles.mainInfo} text={model} />
        </View>
      </View>
      <Spacer vertical={'s'} />
      <FlashList
        horizontal
        data={car_photos}
        estimatedItemSize={10}
        renderItem={renderImage}
        ItemSeparatorComponent={renderSeparator}
      />
      <Spacer vertical={'s'} />
      <View style={styles.spacedRow}>
        <Typography style={styles.mainInfo} text={`${price} $`} />
      </View>
    </Paper>
  );
}

export const CarCard = memo(Component);
