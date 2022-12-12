import { useEffect } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';

import { getPersistedData, isTokenExpired, showMessage } from '@utils/helpers';
import { useStore } from '@store';
import { User } from '@models';

const getData = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

const getError = (e: AxiosError<{ errors: Record<string, Array<string>> }>) => {
  if (e.response) {
    const { errors } = e.response.data;
    throw Object.values(errors).flat();
  }
  throw null;
};

export const api = {
  get: <T>(url: string, params = {}) =>
    axios.get<T, AxiosResponse<T>>(url, { params }).then(getData).catch(getError),
  post: <T>(url: string, data = {}, params = {}) =>
    axios.post<T, AxiosResponse<T>>(url, data, { params }).then(getData).catch(getError),
  patch: <T>(url: string, data = {}, params = {}) =>
    axios.patch<T, AxiosResponse<T>>(url, data, { params }).then(getData).catch(getError),
  put: <T>(url: string, data = {}, params = {}) =>
    axios.put<T, AxiosResponse<T>>(url, data, { params }).then(getData).catch(getError),
  delete: (url: string, data = {}) =>
    axios.delete<null, AxiosResponse<null>>(url, { data }).then(getData).catch(getError),
};

export const useApi = () => {
  const { userStore } = useStore();
  const { clear } = userStore;

  useEffect(() => {
    axios.defaults.baseURL = 'http://192.168.100.35:8000';

    axios.interceptors.request.use(async (config) => {
      const user = await getPersistedData<User>('user');
      if (user?.token && !isTokenExpired(user.token) && config.headers) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
      return config;
    }, Promise.reject);

    axios.interceptors.response.use(null, (error) => {
      if (error.response?.status === 403) {
        clear();
        showMessage({ type: 'error', message: 'Session has been expired' });
      }
      return Promise.reject(error);
    });
  }, []);
};
