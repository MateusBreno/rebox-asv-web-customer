import Called from './Called';

export default interface CalledAddresses {
  id?: string;
  type: string;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: number;
  complement?: string;
  zip_code?: string;
  description?: string;
  full_address?: string;
  reference_type?: string;
  reference_id?: string;
  created_at?: Date;
  updated_at?: Date;

  called?: Called;
}
