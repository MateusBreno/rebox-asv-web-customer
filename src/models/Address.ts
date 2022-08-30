import User from './User';

export default interface Address {
  id?: string;
  users_id: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
  zip_code: string;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
}
