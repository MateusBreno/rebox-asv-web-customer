// ./src/models/Indication.ts
import User from './User';

export default interface Indication {
  id: string;
  id_who_indicated: string;
  id_indicated: string;
  cash_bonus: number;
  renewal_number: number;
  status: string;
  date: string;
  created_at: Date;
  updated_at: Date;
  user_who_indicated?: User;
  user_indicated?: User;
}
