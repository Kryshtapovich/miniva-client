import { action, makeObservable, observable, runInAction } from 'mobx';

import { Chat } from '@models';
import { chatsApi } from '@api';

import { BaseStore } from './base';

export class ChatsStore extends BaseStore {
  @observable chats: Array<Chat> = [];
  @observable sender: string | null = null;
  @observable recipient: string | null = null;

  constructor() {
    super();
    makeObservable(this);
  }

  @action setConversation = (sender: string, recipient: string) => {
    this.sender = sender;
    this.recipient = recipient;
  };

  @action getUserChats = async () => {
    this.startLoading();
    try {
      const chats = await chatsApi.getUserChats();
      runInAction(() => {
        this.chats = chats;
      });
    } catch (e) {
      this.errorHandler(e);
    } finally {
      this.stopLoading();
    }
  };
}
