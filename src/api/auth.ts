import { User } from '@models';

import { api } from './base';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest extends SignInRequest {
  username: string;
}

export const authApi = {
  signIn: (payload: SignInRequest) => {
    return api.post<User>('users/login', payload);
  },
  signUp: (payload: SignUpRequest) => {
    return api.post<User>('users', payload);
  },
};
