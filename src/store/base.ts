import { action, computed, makeObservable, observable } from 'mobx';

export class BaseStore {
  @observable private isLoading = false;
  @observable private errorsArr: Array<string> | null = null;

  constructor() {
    makeObservable(this);
  }

  @computed public get loading() {
    return this.isLoading;
  }

  @computed public get errors() {
    return this.errorsArr;
  }

  @action protected startLoading = () => {
    this.isLoading = true;
    this.errorsArr = null;
  };

  @action protected stopLoading = () => {
    this.isLoading = false;
  };

  @action protected errorHandler = (errors: unknown) => {
    if (Array.isArray(errors)) {
      this.errorsArr = errors;
    }
  };

  @action clearErrors = () => {
    this.errorsArr = null;
  };
}
