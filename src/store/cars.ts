import { action, makeObservable, observable, runInAction } from 'mobx';

import { carsApi } from '@api';
import { Car } from '@models';

import { BaseStore } from './base';

export class CarsStore extends BaseStore {
  @observable cars: Array<Car> = [];
  @observable car: Car | null = null;

  constructor() {
    super();
    makeObservable(this);
  }

  @action getAll = async (withLoader?: boolean) => {
    withLoader && this.startLoading();
    try {
      const cars = await carsApi.getAll();
      runInAction(() => {
        this.cars = cars;
      });
    } catch (e) {
      this.errorHandler(e);
    } finally {
      withLoader && this.stopLoading();
    }
  };

  @action setCar = (car: Car | null) => {
    this.car = car;
  };

  @action getCar = async (carId: number) => {
    try {
      const car = await carsApi.getCar(carId);
      this.setCar(car);
    } catch (e) {
      this.errorHandler(e);
    }
  };

  @action createCar = async (data: Omit<Car, 'id'>) => {
    this.startLoading();
    try {
      await carsApi.createCar(data);
    } catch (e) {
      this.errorHandler(e);
    } finally {
      this.stopLoading();
    }
  };

  @action clear = () => {
    this.cars = [];
    this.car = null;
    this.clearErrors();
  };
}
