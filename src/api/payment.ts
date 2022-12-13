import { api } from './base';

interface PaymentPage {
  redirect_url: string;
}

export const paymentApi = {
  getPage: (carId: number) => {
    return api.post<PaymentPage>(`/create-checkout-session/${carId}`);
  },
};
