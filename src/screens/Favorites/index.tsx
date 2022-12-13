import { observer } from 'mobx-react-lite';

import { ScreenContainer, Spinner } from '@components/common';
import { useScreenEnter } from '@utils/hooks';
import { CarList } from '@components/cars';
import { useStore } from '@store';

import { useStyles } from './styles';

function Component() {
  const { carsStore } = useStore();
  const { getFavorites, cars, toggleFavorite, loading } = carsStore;

  const styles = useStyles();

  useScreenEnter(() => {
    getFavorites();
  }, []);

  if (loading) return <Spinner />;

  return (
    <ScreenContainer disablePaddings containerStyle={styles.conatiner}>
      <CarList cars={cars} toggleFavorite={toggleFavorite} onRefresh={getFavorites} />
    </ScreenContainer>
  );
}

export const FavoritesScreen = observer(Component);
