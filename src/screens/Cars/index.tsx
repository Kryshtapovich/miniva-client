import { useRoute } from '@react-navigation/native';

import { observer } from 'miniva-common';

import { RouteNames } from '@navigation';
import { CarList } from '@components/cars';
import { ScreenContainer } from '@components/common';
import { useScreenEnter, useStore } from '@utils/hooks';

import { useStyles } from './styles';

function Component() {
  const { name } = useRoute();
  const { carsStore } = useStore();
  const { cars, getAll, getFavorites, clear, toggleFavorite } = carsStore;

  const styles = useStyles();

  useScreenEnter(() => {
    name === RouteNames.cars ? getAll() : getFavorites();
    return clear;
  }, [name]);

  return (
    <ScreenContainer contentStyle={styles.content}>
      <CarList cars={cars} toggleFavorite={toggleFavorite} />
    </ScreenContainer>
  );
}

export const CarsScreen = observer(Component);
