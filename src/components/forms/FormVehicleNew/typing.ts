// ./src/components/forms/FormVehicleNew/typing.ts
export interface ISelect {
  label: string;
  value: string;
}

export interface IFormVehicle {
  classification: string;
  brand: string;
  model: string;
  license_plate: string;
  year: number;
  color: string;
  armored: boolean;
  status: string;
}
