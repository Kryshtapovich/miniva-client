import { useEffect } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';

import { getUser, isTokenExpired, showMessage } from '@utils/helpers';
import { useStore } from '@store';

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
  delete: (url: string, params = {}) =>
    axios.delete<null, AxiosResponse<null>>(url, { params }).then(getData).catch(getError),
};

export const useApi = () => {
  const { userStore } = useStore();
  const { clear } = userStore;

  useEffect(() => {
    axios.defaults.baseURL = process.env.API_URL;

    axios.interceptors.request.use(async (config) => {
      const user = await getUser();
      if (user?.token && !isTokenExpired(user.token) && config.headers) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
      return config;
    });

    axios.interceptors.response.use(null, (error) => {
      if (error.response?.status === 403) {
        clear();
        showMessage({ type: 'error', message: 'Session has been expired' });
      }
    });
  }, []);
};
