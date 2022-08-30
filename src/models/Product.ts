// ./src/models/Products.ts

interface ProductItem {
  id: string;
  products_id: string;
  type: string;
  description: string;
  differential: boolean;
}

export default interface Product {
  id?: string;
  name: string;
  type: string;
  tag: string;
  current_price: number;
  promotional_price: number;
  charge_type: string;
  grace_period_in_hours: number;
  expires_in_days: number;
  renovated_in: string;
  category: string;
  classification: string;
  available_uses: number;
  allowed_seasonality_for_calls: string;
  number_calls_allowed_in_seasonality: number;
  interval_between_calls_in_days?: number;
  limit_of_covered_vehicles: number;
  coverage_months_limit: number;
  coverage_level?: string;
  description?: string;
  status: string;
  who_created: string;
  image_url?: string;

  product_items: ProductItem[];
  services_included?: any[];
  contracts?: any[];
}
