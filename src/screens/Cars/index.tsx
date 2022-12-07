import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { observer, useStore } from 'miniva-common';

import { RouteNames } from '@navigation';
import { CarList } from '@components/cars';
import { Button, ScreenContainer, Spinner } from '@components/common';

import { useStyles } from './styles';

function Component() {
  const { carsStore } = useStore();
  const { cars, loading, getAll } = carsStore;

  const { navigate } = useNavigation();

  const styles = useStyles();

  useEffect(() => {
    getAll(true);
  }, []);

  const goToFilter = () => {
    navigate(RouteNames.carFilter);
  };

  if (loading) return <Spinner />;

  return (
    <ScreenContainer disablePaddings containerStyle={styles.container}>
      <CarList cars={cars} toggleFavorite={Promise.resolve} onRefresh={getAll} />
      {!!cars.length && (
        <Button
          label="Filters"
          onPress={goToFilter}
          icon={{ set: 'Feather', name: 'filter' }}
          style={[styles.button, !cars.length && styles.hidden]}
        />
      )}
    </ScreenContainer>
  );
}

export const CarsScreen = observer(Component);
