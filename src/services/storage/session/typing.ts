// ./src/services/storage/session/typing.ts
import User from '@models/User';

export interface ISaveStateSession {
  token: string;
  user: User;
  sessions_id: string;
}

export interface IRemember {
  date: string;
  expires_in: number;
}
