import Vehicle from '@models/Vehicle';

export interface IResponseVehicles {
  header: {
    total: number;
    page: number;
    per_page: number;
    status_code: number;
    message: string;
  };
  data: Vehicle[];
}
