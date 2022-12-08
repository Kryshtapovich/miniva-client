import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { observer, useStore } from 'miniva-common';

import { Button, IconButton, Paper, Spacer, Spinner, Typography } from '@components/common';
import { RouteNames, RouteParams } from '@navigation';
import { dateToLocal } from '@utils/helpers';

import { ImageList } from './ImageList';
import { useStyles } from './styles';

function Component() {
  const { params } = useRoute<RouteParams<RouteNames.car>>();
  const { carId } = params;

  const { goBack } = useNavigation();

  const styles = useStyles();

  const { carsStore } = useStore();
  const { car, getCar, setCar } = carsStore;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setCar(null);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCar(carId).finally(() => setIsLoading(false));
  }, [carId]);

  if (isLoading || !car) return <Spinner />;

  const getHeader = (style: StyleProp<ViewStyle>) => {
    return (
      <View style={[styles.header, style]}>
        <IconButton icon={{ set: 'AntDesign', name: 'arrowleft', size: 25 }} onPress={goBack} />
        <IconButton icon={{ set: 'Feather', name: 'star', size: 20 }} onPress={Promise.resolve} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && getHeader(styles.mobileHeader)}
      <ScrollView>
        {Platform.OS === 'web' && getHeader(styles.webHeader)}
        <View style={styles.body}>
          <ImageList images={car.car_photos} style={styles.images} />
          <View style={styles.info}>
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
        </View>
        <Spacer vertical={'xxl'} />
      </ScrollView>
      <Button label="Contact reviewer" onPress={Promise.resolve} style={styles.button} />
    </View>
  );
}

export const CarDetailsScreen = observer(Component);
