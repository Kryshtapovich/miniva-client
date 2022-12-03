import { observer, useStore } from 'miniva-common';

import { ScreenContainer } from '@components/common';

import { CarList } from '@components/cars';

function Component() {
  const { carsStore } = useStore();
  const { cars } = carsStore;

  return (
    <ScreenContainer disablePaddings>
      <CarList cars={cars} toggleFavorite={Promise.resolve} onRefresh={Promise.resolve} />
    </ScreenContainer>
  );
}

export const FavoritesScreen = observer(Component);
