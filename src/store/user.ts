import { action, makeObservable, observable, reaction } from 'mobx';

import { authApi, userApi } from '@api';
import { User } from '@models';
import { isTokenExpired, persistData } from '@utils/helpers';

import { BaseStore } from './base';

export class UserStore extends BaseStore {
  @observable user: User | null = null;
  @observable isAuthorized = false;

  constructor() {
    super();
    makeObservable(this);
    reaction(() => this.user, this.checkToken);
  }

  @action init = (user: User | null) => {
    this.user = user;
    persistData('user', user);
  };

  @action getUserData = async () => {
    try {
      const user = await userApi.getUserData();
      this.init(user);
    } catch (e) {
      this.errorHandler(e);
    }
  };

  @action private checkToken = () => {
    this.isAuthorized = !!this.user?.token && !isTokenExpired(this.user.token);
  };

  @action signIn = async (email: string, password: string) => {
    this.startLoading();
    try {
      const user = await authApi.signIn({ email, password });
      this.init(user);
    } catch (e) {
      this.errorHandler(e);
    } finally {
      this.stopLoading();
    }
  };

  @action signUp = async (username: string, email: string, password: string) => {
    this.startLoading();
    try {
      const user = await authApi.signUp({ username, email, password });
      this.init(user);
    } catch (e) {
      this.errorHandler(e);
    } finally {
      this.stopLoading();
    }
  };

  @action editUser = async (username: string, email: string, password: string) => {
    this.startLoading();
    try {
      const payload = Object.fromEntries(
        Object.entries({ username, email, password }).filter(([_, value]) => !!value),
      );
      const user = await userApi.editData(payload);
      this.init(user);
    } catch (e) {
      this.errorHandler(e);
      throw e;
    } finally {
      this.stopLoading();
    }
  };

  @action clear = () => {
    this.user = null;
    this.clearErrors();
  };
}
