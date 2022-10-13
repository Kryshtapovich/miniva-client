import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { observer } from 'miniva-common';

import { CarList } from '@components/cars';
import { useStore } from '@utils/hooks';

import { useStyles } from './styles';

function Component() {
  const { carsStore } = useStore();
  const { favorites, getFavorites, toggleFavorite } = carsStore;

  const styles = useStyles();

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CarList cars={favorites} toggleFavorite={toggleFavorite} />
    </SafeAreaView>
  );
}

export const FavoritesScreen = observer(Component);
