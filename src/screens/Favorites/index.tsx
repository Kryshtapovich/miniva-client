import { observer } from 'mobx-react-lite';

import { ScreenContainer } from '@components/common';
import { CarList } from '@components/cars';
import { useStore } from '@store';

import { useStyles } from './styles';

function Component() {
  const { carsStore } = useStore();
  const { cars } = carsStore;

  const styles = useStyles();

  return (
    <ScreenContainer disablePaddings containerStyle={styles.conatiner}>
      <CarList cars={cars} toggleFavorite={Promise.resolve} onRefresh={Promise.resolve} />
    </ScreenContainer>
  );
}

export const FavoritesScreen = observer(Component);
