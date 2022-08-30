export default interface Service {
  id: string;
  code: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  worker_regions_services?: any[];
}
