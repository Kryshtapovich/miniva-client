import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';

import { carsApi } from '@api';
import { Car, CarFilter } from '@models';
import { getPersistedData, persistData } from '@utils/helpers';

import { BaseStore } from './base';

export class CarsStore extends BaseStore {
  @observable cars: Array<Car> = [];
  @observable car: Car | null = null;
  @observable filter: CarFilter | null = null;

  constructor() {
    super();
    makeObservable(this);
    getPersistedData<CarFilter>('filter').then(this.setFilter);
    reaction(
      () => this.filter,
      (filter) => persistData('filter', filter),
    );
  }

  @computed get isFilterApplied() {
    return this.filter && Object.values(this.filter).some(Boolean);
  }

  @action getAll = async (withLoader?: boolean) => {
    withLoader && this.startLoading();
    try {
      const cars = await carsApi.getAll(this.filter || undefined);
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

  @action private setFilter = (filter: CarFilter | null) => {
    this.filter = filter;
  };

  @action filterCars = async (filter: CarFilter) => {
    this.startLoading();
    try {
      const reducedFilter = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => !!value),
      );
      this.setFilter(reducedFilter);
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
