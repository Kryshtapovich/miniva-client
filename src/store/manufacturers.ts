import { action, makeObservable, observable, runInAction } from 'mobx';

import { Manufacturer } from '@models';
import { manufacturersApi } from '@api';

import { BaseStore } from './base';

export class ManufacturersStore extends BaseStore {
  @observable manufacturers: Array<Manufacturer> = [];

  constructor() {
    super();
    makeObservable(this);
  }

  @action getAll = async () => {
    this.startLoading();
    try {
      const manufacturers = await manufacturersApi.getAll();
      runInAction(() => {
        this.manufacturers = manufacturers;
      });
    } catch (e) {
      this.errorHandler(e);
    } finally {
      this.stopLoading();
    }
  };

  @action clear = () => {
    this.manufacturers = [];
    this.clearErrors();
  };
}
