import { UserRole } from './role';

export interface User {
  email: string;
  username: string;
  role: UserRole;
  token: string;
}

export type Reviewer = Omit<User, 'role'>;
