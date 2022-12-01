import { useState } from 'react';
import { FlashList } from '@shopify/flash-list';

import { Car } from 'miniva-common';

import { EmptyPlaceholder, Spacer } from '@components/common';

import { CarCard } from '../Card';
import { useStyles } from './styles';

interface Props {
  cars: Array<Car>;
  onRefresh: () => Promise<void>;
  toggleFavorite: (carId: number) => Promise<void>;
}

export function CarList(props: Props) {
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
    return (
      <EmptyPlaceholder
        text="No cars found"
        icon={{ set: 'Ionicons', name: 'car-sport' }}
        style={styles.placeholder}
      />
    );
  };

  const getExtractor = ({ id }: Car) => {
    return id.toString();
  };

  return (
    <FlashList
      data={cars}
      renderItem={getCar}
      onRefresh={refresh}
      estimatedItemSize={500}
      refreshing={isRefreshing}
      keyExtractor={getExtractor}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={getSeparator}
      ListFooterComponent={getSeparator}
      ItemSeparatorComponent={getSeparator}
      ListEmptyComponent={getEmptyComponent}
    />
  );
}
