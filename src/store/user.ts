import { action, makeObservable, observable, reaction } from 'mobx';

import { authApi, userApi } from '@api';
import { User } from '@models';
import { isTokenExpired } from '@utils/helpers';

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
    this.checkToken();
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
      this.stopLoading();
      return user;
    } catch (e) {
      this.stopLoading();
      this.errorHandler(e);
      return null;
    }
  };

  @action signUp = async (username: string, email: string, password: string) => {
    this.startLoading();
    try {
      const user = await authApi.signUp({ username, email, password });
      this.init(user);
      this.stopLoading();
      return user;
    } catch (e) {
      this.stopLoading();
      this.errorHandler(e);
      return null;
    }
  };

  @action clear = () => {
    this.user = null;
    this.clearErrors();
  };
}
