import Address from './Address';
import Contract from './Contract';
import Indication from './Indication';
import Setting from './Setting';
import Vehicle from './Vehicle';

export default interface User {
  id?: string;
  name: string;
  person_type?: string;
  cpf?: string;
  cnpj?: string;
  date_of_birth?: string;
  sex?: string;
  email: string;
  role: string;
  cellphone: string;
  is_partner?: boolean;
  status: string;
  accept_terms_of_use: boolean;
  image_url?: string;
  company_size?: string;
  password?: string;
  referral_code?: string;
  balance?: number;
  number_of_logins?: number;
  confirmed_email?: boolean;
  confirmed_cellphone?: boolean;
  telephone?: string;
  created_at?: Date;
  updated_at?: Date;

  gateway_customers_id?: string;
  epharma_holder_id?: string;
  code_who_indicated?: string;
  access_level?: string;
  subordinate_of?: string;
  setting: Setting;
  adresses: Address[];
  vehicles: Vehicle[];
  contracts: Contract[];
  indications: Indication[];
}
