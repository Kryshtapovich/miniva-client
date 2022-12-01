import { useEffect } from 'react';

import { isTokenExpired, setupApi, useStore } from 'miniva-common';

import { getUser, showMessage } from '@utils/helpers';

export const useApi = () => {
  const { userStore } = useStore();
  const { clear } = userStore;

  useEffect(() => {
    setupApi({
      url: 'http://0.0.0.0:8000',
      onRequest: async (config) => {
        const user = await getUser();
        if (user?.token && !isTokenExpired(user.token) && config.headers) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
      },
      onResponseError: (error) => {
        if (error.response?.status === 403) {
          clear();
          showMessage({ type: 'error', message: 'Session has been expired' });
        }
      },
    });
  }, []);
};
