import { User } from './user';

export enum MessageType {
  Chat = 'chat_message',
  Last = 'last_50_messages',
}

export interface Message {
  id: number;
  attached_photo: string;
  content: string;
  conversation: string;
  from_user: User;
  to_user: User;
  read: boolean;
  timestamp: string;
}

export interface OnOpenEvent {
  type: MessageType.Last;
  car_id: number;
  has_more: boolean;
  messages: Array<Message>;
}

export interface OnRecievedEvent {
  type: MessageType.Chat;
  name: string;
  message: Message;
}

export type ChatEvent = OnOpenEvent | OnRecievedEvent;
