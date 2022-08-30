import User from './User';

export default interface Setting {
  id?: string;
  users_id?: string;
  to_be_notified_by_email?: boolean;
  receive_news_by_email?: boolean;
  theme?: string;
  language?: string;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
}
