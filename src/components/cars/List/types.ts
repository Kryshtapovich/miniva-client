import { Car } from '@models';

export interface CarListProps {
  cars: Array<Car>;
  onRefresh: () => Promise<void>;
  toggleFavorite: (carId: number) => Promise<void>;
}

export type Params = () => { CarList: (props: CarListProps) => JSX.Element };
