// ./src/models/Rescue.ts
import User from './User';

export default interface Rescue {
  id?: string;
  name: string;
  code: string;
  amount: number;
  status: string;
  date: string;
  date_payment?: string;
  id_who_made_the_payment?: string;

  user?: User;
  who_made_the_payment?: User;
}
