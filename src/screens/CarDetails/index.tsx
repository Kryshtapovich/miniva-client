import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View, ImageStyle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { FlashList } from '@shopify/flash-list';

import { observer, useStore } from 'miniva-common';

import {
  Button,
  IconButton,
  Image,
  ImageViewer,
  Paper,
  Spacer,
  Spinner,
  Typography,
} from '@components/common';
import { RouteNames, RouteParams } from '@navigation';

import { useStyles } from './styles';
import { dateToLocal } from '@utils/helpers';

function Component() {
  const { params } = useRoute<RouteParams<RouteNames.car>>();
  const { carId } = params;

  const { goBack } = useNavigation();

  const styles = useStyles();

  const { carsStore } = useStore();
  const { car, getCar, setCar } = carsStore;

  const [isLoading, setIsLoading] = useState(false);
  const [viewer, setViewer] = useState({ index: 0, visible: false });

  useEffect(() => {
    return () => {
      setCar(null);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCar(carId).finally(() => setIsLoading(false));
  }, [carId]);

  const toggleImageViewer = (index?: number) => {
    setViewer((prev) => ({ index: index || 0, visible: !prev.visible }));
  };

  const renderImage = ({ item, index }: { item: string; index: number }) => {
    return (
      <Pressable onPress={toggleImageViewer.bind(null, index)}>
        <Image fitScreen uri={item} style={styles.image as ImageStyle} />
      </Pressable>
    );
  };

  const getSeparator = () => {
    return <Spacer horizontal={'xxs'} />;
  };

  if (isLoading || !car) return <Spinner />;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton icon={{ set: 'Feather', name: 'chevron-left', size: 25 }} onPress={goBack} />
          <IconButton icon={{ set: 'Feather', name: 'star', size: 20 }} onPress={Promise.resolve} />
        </View>
        <ScrollView>
          <FlashList
            horizontal
            data={car.car_photos}
            estimatedItemSize={10}
            renderItem={renderImage}
            ItemSeparatorComponent={getSeparator}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.body}>
            <Paper>
              <View style={styles.spacedRow}>
                <View style={styles.row}>
                  <Typography text={car.manufacturer.toString()} style={styles.title} />
                  <Spacer horizontal={'xs'} />
                  <Typography text={car.model} style={styles.title} />
                </View>
                <Typography text={`${car.price} $`} style={styles.title} />
              </View>
              <Spacer vertical={'xs'} />
              <Typography text={`${car.engine} l, ${car.hp} hp, ${car.color}`} />
            </Paper>
            <Spacer vertical={'s'} />
            <Paper>
              <Typography text={'VIN'} style={styles.title} />
              <Typography text={car.vin} />
            </Paper>
            <Spacer vertical={'s'} />
            <Paper>
              <Typography text={'Created'} style={styles.title} />
              <Typography text={dateToLocal(car.created_at)} />
            </Paper>
            <Spacer vertical={'s'} />
            <Paper>
              <Typography text={'Updated'} style={styles.title} />
              <Typography text={dateToLocal(car.updated_at)} />
            </Paper>
          </View>
          <Spacer vertical={'xxl'} />
        </ScrollView>
        <Button label="Contact reviewer" onPress={Promise.resolve} style={styles.button} />
      </View>
      <ImageViewer {...viewer} images={car.car_photos} onClose={toggleImageViewer} />
    </>
  );
}

export const CarDetailsScreen = observer(Component);
