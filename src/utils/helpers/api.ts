import { setupApi } from 'miniva-common';

import { getUser } from './auth';

export const configureApi = () => {
  setupApi({
    url: 'http://192.168.100.35:8000',
    onRequest: async (config) => {
      const user = await getUser();
      const isAuth = config.url === 'users' || config.url === 'users/login';
      if (user?.token && config.headers && !isAuth) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
      return config;
    },
  });
};
