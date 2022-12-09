import { User } from '@models';

import { api } from '../base';
import { SignUpRequest, SignInRequest } from './types';

export const authApi = {
  signIn: (payload: SignInRequest) => {
    return api.post<User>('users/login', payload);
  },
  signUp: (payload: SignUpRequest) => {
    return api.post<User>('users', payload);
  },
};
