import Payment from '@models/Payment';

export interface IResponseCharges {
  header: {
    total: number;
    page: number;
    per_page: number;
    status_code: number;
    message: string;
  };
  data: Payment[];
}
