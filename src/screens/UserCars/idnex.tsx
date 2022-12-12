import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { Button, ScreenContainer, Spinner } from '@components/common';
import { CarList } from '@components/cars';
import { RouteNames } from '@navigation';
import { useStore } from '@store';

import { CarFilterModal } from '../CarFilter/modal';
import { useStyles } from './styles';
import { useScreenEnter } from '@utils/hooks';

function Component() {
  const { carsStore } = useStore();
  const { userCars, getUserCars } = carsStore;

  const styles = useStyles();

  useScreenEnter(() => {
    getAll(true);
  }, []);

  if (loading) return <Spinner />;

  return (
    <ScreenContainer disablePaddings containerStyle={styles.container}>
      <CarList cars={userCars} toggleFavorite={toggleFavorite} onRefresh={getAll} />
    </ScreenContainer>
  );
}

export const CarsScreen = observer(Component);
