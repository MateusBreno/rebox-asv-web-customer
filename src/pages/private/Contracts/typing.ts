import Contract from '@models/Contract';

export interface IResponseContracts {
  header: {
    count_total_sales: number;
    count_sales_today: number;
    total: number;
    role: string;
    page: number;
    per_page: number;
    status_code: number;
    message: string;
  };
  data: Contract[];
}
