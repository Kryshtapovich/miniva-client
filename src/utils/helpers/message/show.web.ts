import { toast } from 'react-toastify';

import { Params } from './types';

export const showMessage = ({ type, message }: Params) => {
  toast[type](message);
};
