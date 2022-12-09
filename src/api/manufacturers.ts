import { Manufacturer } from '@models';

import { api } from './base';

export const manufacturersApi = {
  getAll: () => {
    return api.get<Array<Manufacturer>>('/manufactures');
  },
};
