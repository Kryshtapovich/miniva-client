import { User } from '@models';

import { api } from './base';

interface EditUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

export const userApi = {
  getUserData: () => {
    return api.get<User>('user');
  },
  editData: (data: EditUserRequest) => {
    return api.patch<User>('user', data);
  },
};
