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
  getUserCars: () => {
    return api.get<Array<Car>>('/user-cars');
  },
  getFavorites: () => {
    return api.get<Array<Car>>('/user/favourite-cars');
  },
  toggleFavorite: (flag: boolean, carId: number) => {
    return api[flag ? 'post' : 'delete']('user/favourite-cars', { car_id: carId });
  },
};
