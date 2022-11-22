import { setupApi } from 'miniva-common';

import { getToken } from './token';

export const configureApi = () => {
  setupApi({
    url: 'http://localhost:8000',
    onRequest: async (config) => {
      const token = await getToken();
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
  });
};
