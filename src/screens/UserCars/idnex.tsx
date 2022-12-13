import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { Button, ScreenContainer, Spinner } from '@components/common';
import { useScreenEnter } from '@utils/hooks';
import { CarList } from '@components/cars';
import { RouteNames } from '@navigation';
import { useStore } from '@store';

import { CarFilterModal } from '../CarFilter/modal';
import { useStyles } from './styles';

function Component() {
  const { carsStore } = useStore();
  const { cars, getUserCars, loading } = carsStore;

  const styles = useStyles();

  useScreenEnter(() => {
    getUserCars();
  }, []);

  if (loading) return <Spinner />;

  return <ScreenContainer disablePaddings containerStyle={styles.container}>
    
  </ScreenContainer>;
}

export const CarsScreen = observer(Component);
