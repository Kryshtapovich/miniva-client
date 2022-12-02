import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Car } from 'miniva-common';

import { EmptyPlaceholder, Spacer } from '@components/common';
import { theme } from '@utils/constants';

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

  const getRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        colors={[theme.colors.orange]}
        tintColor={theme.colors.orange}
      />
    );
  };

  return (
    <FlashList
      data={cars}
      renderItem={getCar}
      onRefresh={refresh}
      estimatedItemSize={500}
      refreshing={isRefreshing}
      keyExtractor={getExtractor}
      ListHeaderComponent={getSeparator}
      ListFooterComponent={getSeparator}
      refreshControl={getRefreshControl()}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={getSeparator}
      ListEmptyComponent={getEmptyComponent}
    />
  );
}
