import { observer } from 'mobx-react-lite';

import { ScreenContainer } from '@components/common';
import { CarList } from '@components/cars';
import { useStore } from '@store';

import { useStyles } from './styles';
import { useScreenEnter } from '@utils/hooks';

function Component() {
  const { carsStore } = useStore();
  const { getFavorites, favorites, toggleFavorite } = carsStore;

  const styles = useStyles();

  useScreenEnter(() => {
    getFavorites();
  }, []);

  return (
    <ScreenContainer disablePaddings containerStyle={styles.conatiner}>
      <CarList cars={favorites} toggleFavorite={toggleFavorite} onRefresh={Promise.resolve} />
    </ScreenContainer>
  );
}

export const FavoritesScreen = observer(Component);
