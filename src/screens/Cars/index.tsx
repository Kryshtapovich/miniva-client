import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer, useStore } from 'miniva-common';

import { RouteNames } from '@navigation';
import { CarList } from '@components/cars';
import { IconButton, ScreenContainer } from '@components/common';
import { theme } from '@utils/constants';

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

  return (
    <ScreenContainer disablePaddings>
      {loading ? (
        <ActivityIndicator size={'large'} color={theme.colors.orange} style={styles.spinner} />
      ) : (
        <CarList cars={cars} toggleFavorite={Promise.resolve} onRefresh={getAll} />
      )}
      {!!cars.length && (
        <IconButton
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
