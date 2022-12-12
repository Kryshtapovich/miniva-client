import { createContext, useContext } from 'react';

import { configure } from 'mobx';

import { CarsStore } from './cars';
import { UserStore } from './user';
import { ChatsStore } from './chats';
import { ManufacturersStore } from './manufacturers';

configure({ enforceActions: 'always' });

interface Store {
  carsStore: CarsStore;
  userStore: UserStore;
  chatsStore: ChatsStore;
  manufacturersStore: ManufacturersStore;
}

const store: Store = {
  carsStore: new CarsStore(),
  userStore: new UserStore(),
  chatsStore: new ChatsStore(),
  manufacturersStore: new ManufacturersStore(),
};

const storeContext = createContext(store);

export const useStore = () => {
  return useContext(storeContext);
};
