import { Car } from './car';
import { User } from './user';
import { Message } from './message';

export interface Chat {
  id: number;
  name: string;
  other_user: User;
  car: Car;
  last_message: Message;
}
