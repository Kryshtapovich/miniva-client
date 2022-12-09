import { User } from '@models';

import { api } from './base';

export const userApi = {
  getUserData: () => {
    return api.get<User>('user');
  },
};
