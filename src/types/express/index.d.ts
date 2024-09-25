import { IUser } from '../../models/user.model';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: IUser;
  token?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      token?: string;
    }
  }
}