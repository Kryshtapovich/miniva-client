import { Car } from '@models';

export interface CarListProps {
  cars: Array<Car>;
  onRefresh: () => Promise<void>;
  toggleFavorite?: (car: Car) => Promise<void>;
}

export type Params = () => { CarList: (props: CarListProps) => JSX.Element };
