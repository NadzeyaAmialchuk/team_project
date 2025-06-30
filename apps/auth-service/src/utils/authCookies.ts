import { Response } from 'express';

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'strict' });
  res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'strict' });
} 