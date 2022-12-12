import { Chat, Message, User } from '@models';

import { api } from './base';
import { carsApi } from './cars';

interface ChatDto {
  car_topic: number;
  id: number;
  name: string;
  last_message: Message | null;
  other_user: User;
}

export const chatsApi = {
  getUserChats: async () => {
    const chatsDtos = await api.get<Array<ChatDto>>('conversations');
    return Promise.all(
      chatsDtos
        .filter(({ last_message }) => !!last_message)
        .map(async ({ car_topic, ...rest }) => {
          const car = await carsApi.getCar(car_topic);
          return { car, ...rest } as Chat;
        }),
    );
  },
};
