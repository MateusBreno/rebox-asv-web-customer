// ./src/models/RecoverPassword.ts
import User from './User';

export default interface RecoverPassword {
  id?: string;
  expiration_time_in_minutes: number;
  users_id: string;
  status: string;
  created_at?: string;
  updated_at?: string;

  user?: User;
}
