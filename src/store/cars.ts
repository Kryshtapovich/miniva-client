import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { carsApi } from '@api';
import { Car, CarFilter } from '@models';

import { BaseStore } from './base';

export class CarsStore extends BaseStore {
  @observable cars: Array<Car> = [];
  @observable car: Car | null = null;
  @observable filter: CarFilter | null = null;

  constructor() {
    super();
    makeObservable(this);
  }

  @computed get isFilterApplied() {
    return this.filter && Object.values(this.filter).some(Boolean);
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

  @action filterCars = async (filter: CarFilter) => {
    runInAction(() => {
      this.filter = filter;
    });
    this.startLoading();
    try {
      const reducedFilter = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => !!value),
      );
      const cars = await carsApi.getAll(reducedFilter);
      runInAction(() => {
        this.cars = cars;
      });
    } catch (e) {
      this.errorHandler(e);
    } finally {
      this.stopLoading();
    }
  };

  @action resetFilter = () => {
    this.filter = null;
  };

  @action clear = () => {
    this.cars = [];
    this.car = null;
    this.clearErrors();
  };
}
