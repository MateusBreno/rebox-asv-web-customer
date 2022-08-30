// ./src/models/Contract.ts
import Payment from './Payment';
import Product from './Product';
import User from './User';
import Vehicle from './Vehicle';

interface ICV {
  id: string;
  contracts_id: string;
  vehicles_id: string;
  vehicle: Vehicle;
}

export default interface Contract {
  id?: string;
  code?: string;
  products_id: string;
  users_id?: string;
  available_uses?: number;
  date: string;
  covered_up: string;
  status?: string;
  gross_amount: number;
  amount: number;
  renew_in_days?: number;
  form_of_payment: string;
  due_date: string;
  cycle: string;
  who_gave_discount_type?: string;
  who_gave_discount_id?: string;
  discount_type?: string;
  discount_amount_installments?: number;
  number_installments_with_discount?: number;
  allowed_seasonality_for_calls?: string;
  number_calls_allowed_in_seasonality?: number;
  interval_between_calls_in_days?: number;
  current_payments_status?: string;
  rate_type?: string;
  rate_description?: string;
  rate_amount_installments?: number;
  number_installments_with_rate?: number;
  grace_period_release_date?: string;
  number_of_uses_allowed: number;
  next_due_date?: string;
  card?: {
    zipcode: string;
    cpf: string;
    cvv: string;
    due_date: string;
    email: string;
    name: string;
    cellphone: string;
    number: string;
    number_card: string;
    remote_ip: string;
  };
  created_at?: Date;
  updated_at?: Date;

  product?: Product;
  user?: User;
  contracts_vehicles?: ICV[];
  payments?: Payment[];
}
