import { api } from './base';

export const paymentApi = {
  getPage: (carId: number) => {
    return api.post<{ redirect_url: string }>(`/create-checkout-session/${carId}`);
  },
};
