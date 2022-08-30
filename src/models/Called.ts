import CalledAddresses from './CalledAddresses';
import Contract from './Contract';
import Service from './Service';
import User from './User';
import Vehicle from './Vehicle';

export default interface Called {
  id?: string;
  code?: string;
  users_id: string;
  contracts_id?: string;
  vehicles_id: string;
  vehicle_situation?: string;
  who_is_requesting_id: string;
  who_is_answering_id?: string;
  who_is_performing_the_service_id?: string;
  date_created: string;
  appointment_date?: string;
  estimated_hours_for_initiation?: string;
  call_initiation_date?: string;
  estimated_hours_for_service_start?: string;
  service_start_date?: string;
  closing_date?: string;
  source_address_id?: string;
  destination_address_id?: string;
  distance_between_points_in_km?: number;
  location_type?: string;
  services_id: string;
  budget_amount?: number;
  status?: string;
  type?: string;
  description?: string;
  technical_report?: string;
  created_at?: Date;
  updated_at?: Date;

  customer?: User;
  contract?: Contract;
  vehicle?: Vehicle;
  who_is_requesting?: User;
  who_is_answering?: User;
  who_is_performing_the_service?: User;
  source_address?: CalledAddresses;
  destination_address?: CalledAddresses;
  service?: Service;
}
