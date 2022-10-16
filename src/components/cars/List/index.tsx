import { FlashList } from '@shopify/flash-list';
import { Car } from 'miniva-common';

import { Spacer } from '@components/common';

import { CarCard } from '../Card';

import { useStyles } from './styles';

interface Props {
  cars: Array<Car>;
  toggleFavorite: (carId: number) => Promise<void>;
}

export function CarList(props: Props) {
  const { cars, toggleFavorite } = props;

  const styles = useStyles();

  const getCar = ({ item }: { item: Car }) => {
    return <CarCard car={item} style={styles.item} toggleFavorite={toggleFavorite} />;
  };

  const getSeparator = () => {
    return <Spacer vertical={'s'} />;
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
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={getSeparator}
      ListFooterComponent={getSeparator}
      ItemSeparatorComponent={getSeparator}
    />
  );
}
