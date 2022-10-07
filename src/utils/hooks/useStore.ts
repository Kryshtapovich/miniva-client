import { createContext, useContext } from 'react';

import { createStore } from 'miniva-common';

const storeContext = createContext(createStore());

export const useStore = () => {
  return useContext(storeContext);
};
