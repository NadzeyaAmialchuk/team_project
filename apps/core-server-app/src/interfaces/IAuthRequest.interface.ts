import { Request } from 'express';

export interface IAuthRequest extends Request {
  cookies: {
    access_token?: string;
    refresh_token?: string;
  };
  user?: { id: string; email?: string };
}
