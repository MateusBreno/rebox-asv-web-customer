// ./src/models/Payment.ts
import Contract from './Contract';

export default interface Payment {
  id?: string;
  what_is_being_paid: string;
  paying_item_with_id: string;
  amount: number;
  form_of_payment: string;
  cards_id?: string;
  status: string;
  pay_day?: string;
  due_date: string;
  date_created: string;
  gateway?: string;
  gateway_id?: string;
  charge_type: string;
  installment?: number;
  reference_type?: string;
  reference_id?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;

  contract?: Contract;
}
