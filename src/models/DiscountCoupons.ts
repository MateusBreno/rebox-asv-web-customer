export default interface DiscountCoupons {
  id?: string;
  code?: string;
  who_created_the_coupon_id?: string;
  type: string;
  amount?: number;
  recurrence?: string;
  count_limit?: number;
  deadline_type?: string;
  deadline_days?: number;
  date_created?: string;
  description?: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}
