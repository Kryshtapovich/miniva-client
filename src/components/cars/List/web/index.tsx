import { ScrollView } from 'react-native';

import { EmptyPlaceholder } from '@components/common';
import { CarCard } from '@components/cars';

import { CarListProps } from '../types';
import { useStyles } from './styles';

export function CarList(props: CarListProps) {
  const { cars, toggleFavorite } = props;

  const styles = useStyles();

  return (
    <ScrollView contentContainerStyle={styles[cars.length ? 'content' : 'container']}>
      {cars.length ? (
        cars.map((car) => (
          <CarCard key={car.id} car={car} toggleFavorite={toggleFavorite} style={styles.item} />
        ))
      ) : (
        <EmptyPlaceholder text="No cars found" icon={{ set: 'Ionicons', name: 'car-sport' }} />
      )}
    </ScrollView>
  );
}
