import { setupApi } from 'miniva-common';

import { getToken } from './token';

export const configureApi = () => {
  setupApi({
    url: 'http://192.168.100.35:8000',
    onRequest: async (config) => {
      const token = await getToken();
      const isAuth = config.url === 'users' || config.url === 'users/login';
      if (token && config.headers && !isAuth) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
  });
};
