import { Car } from './car';
import { Message } from './message';
import { User } from './user';

export interface Chat {
  id: number;
  name: string;
  other_user: User;
  car: Car;
  last_message: Message;
}
