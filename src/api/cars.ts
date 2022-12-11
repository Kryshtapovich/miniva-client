import { Car, CarFilter } from '@models';

import { api } from './base';

export const carsApi = {
  getAll: (filter?: CarFilter) => {
    return api.get<Array<Car>>('/cars', { ...filter });
  },
  getCar: (carId: number) => {
    return api.get<Car>(`/cars/${carId}`);
  },
  createCar: (payload: Omit<Car, 'id'>) => {
    return api.post<Car>('/cars', payload);
  },
};
