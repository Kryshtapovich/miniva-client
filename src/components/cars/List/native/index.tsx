import { useState } from 'react';
import { Platform, RefreshControl } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { EmptyPlaceholder, Spacer } from '@components/common';
import { CarCard } from '@components/cars';
import { theme } from '@utils/constants';
import { Car } from '@models';

import { CarListProps } from '../types';
import { useStyles } from './styles';

export function CarList(props: CarListProps) {
  const { cars, toggleFavorite, onRefresh } = props;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const styles = useStyles();

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const getCar = ({ item }: { item: Car }) => {
    return <CarCard car={item} style={styles.item} toggleFavorite={toggleFavorite} />;
  };

  const getSeparator = () => {
    return <Spacer vertical={'s'} />;
  };

  const getEmptyComponent = () => {
    return <EmptyPlaceholder text="No cars found" icon={{ set: 'Ionicons', name: 'car-sport' }} />;
  };

  const getExtractor = ({ id }: Car) => {
    return id.toString();
  };

  return (
    <FlashList
      data={cars}
      renderItem={getCar}
      estimatedItemSize={500}
      keyExtractor={getExtractor}
      ListHeaderComponent={getSeparator}
      ListFooterComponent={getSeparator}
      refreshControl={
        <RefreshControl
          onRefresh={refresh}
          refreshing={isRefreshing}
          colors={[theme.colors.orange]}
          tintColor={theme.colors.orange}
        />
      }
      ItemSeparatorComponent={getSeparator}
      ListEmptyComponent={getEmptyComponent}
      showsVerticalScrollIndicator={Platform.OS === 'web'}
      contentContainerStyle={!cars.length ? styles.empty : undefined}
    />
  );
}
