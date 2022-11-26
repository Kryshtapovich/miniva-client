import { useRoute } from '@react-navigation/native';

import { observer, useStore } from 'miniva-common';

import { CarList } from '@components/cars';
import { ScreenContainer } from '@components/common';
import { useScreenEnter } from '@utils/hooks';

import { useStyles } from './styles';

function Component() {
  const { name } = useRoute();
  const { carsStore } = useStore();
  const { cars, loading, getAll, clear } = carsStore;

  const styles = useStyles();

  useScreenEnter(() => {
    getAll();
    return clear;
  }, [name]);

  return (
    <ScreenContainer contentStyle={styles.content}>
      {!loading && <CarList cars={cars} toggleFavorite={Promise.resolve} />}
    </ScreenContainer>
  );
}

export const CarsScreen = observer(Component);
