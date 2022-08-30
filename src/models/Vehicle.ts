// ./src/models/Vehicle.ts

import User from './User';

export default interface Vehicle {
  id: string;
  users_id: string;
  classification: string;
  brand: string;
  model: string;
  license_plate: string;
  year: number;
  color: string;
  armored: boolean;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
}
