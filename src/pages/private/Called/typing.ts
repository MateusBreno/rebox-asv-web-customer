import Called from '@models/Called';

export interface IResponseCalled {
  header: {
    total: number;
    page: number;
    per_page: number;
    status_code: number;
    message: string;
  };
  data: Called[];
}
