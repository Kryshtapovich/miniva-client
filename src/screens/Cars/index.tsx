import { useState } from 'react';
import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { Button, ScreenContainer, Spinner } from '@components/common';
import { useScreenEnter } from '@utils/hooks';
import { CarList } from '@components/cars';
import { CarFilterModal } from '@screens';
import { RouteNames } from '@navigation';
import { useStore } from '@store';

import { useStyles } from './styles';

function Component() {
  const { carsStore } = useStore();
  const { cars, loading, getAll, isFilterApplied, toggleFavorite } = carsStore;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { navigate } = useNavigation();

  const styles = useStyles();

  useScreenEnter(() => {
    getAll(true);
  }, []);

  const goToFilter = () => {
    Platform.OS === 'web' ? setIsModalVisible(true) : navigate(RouteNames.carFilter);
  };

  if (loading) return <Spinner />;

  return (
    <ScreenContainer disablePaddings containerStyle={styles.container}>
      <CarList cars={cars} toggleFavorite={toggleFavorite} onRefresh={getAll} />
      <View>
        <Button
          label="Filters"
          onPress={goToFilter}
          icon={{ set: 'Feather', name: 'filter' }}
          style={styles.button}
        />
        <View style={styles[isFilterApplied ? 'withFilter' : 'hidden']} />
      </View>
      <CarFilterModal visible={isModalVisible} setVisible={setIsModalVisible} />
    </ScreenContainer>
  );
}

export const CarsScreen = observer(Component);
