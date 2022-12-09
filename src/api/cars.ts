import { Car } from '@models';

import { api } from './base';

export const carsApi = {
  getAll: () => {
    return api.get<Array<Car>>('/cars');
  },
  getCar: (carId: number) => {
    return api.get<Car>(`/cars/${carId}`);
  },
  createCar: (payload: Omit<Car, 'id'>) => {
    return api.post<Car>('/cars', payload);
  },
};
