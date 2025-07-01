import { Response } from 'express';

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie('access_token', accessToken, { httpOnly: true, secure: true, sameSite: 'none', domain: 'localhost' });
  res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', domain: 'localhost' });
}
