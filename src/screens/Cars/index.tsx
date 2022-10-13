import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { observer } from 'miniva-common';

import { CarList } from '@components/cars';
import { useStore } from '@utils/hooks';

import { useStyles } from './styles';

function Component() {
  const { carsStore } = useStore();
  const { cars, getAll, toggleFavorite } = carsStore;

  const styles = useStyles();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CarList cars={cars} toggleFavorite={toggleFavorite} />
    </SafeAreaView>
  );
}

export const CarsScreen = observer(Component);
