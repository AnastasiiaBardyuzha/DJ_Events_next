import type { NextApiResponse } from 'next';
import cookie from 'cookie';
import { COOKIES_ACTIONS } from 'utils/constants';
import { isDevelopmentMode } from 'helper/isDevelopmentMode';

export const setCookies = (
  res: NextApiResponse,
  token: string,
) => (
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(
      'token',
      String(token),
      {
        httpOnly: true,
        secure: !isDevelopmentMode(), // secure work only in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/', // for everywhere
      },
    ),
  )
);

export const destroyCookies = (
  res: NextApiResponse,
) => (
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(
      'token', 
      '', 
      {
        httpOnly: true,
        secure: !isDevelopmentMode(), // secure work only in production
        expires: new Date(0),
        sameSite: 'strict',
        path: '/', // for everywhere
      },
    ),
  )
);

interface actionCookiesVariables {
  act: string,
  res: NextApiResponse,
  token?: string
}

export const actionWithCookies = (
  {
    act,
    res,
    token = '',
  }: actionCookiesVariables,
) => {
  if (act === COOKIES_ACTIONS.set) return setCookies(res, token);
  return destroyCookies(res);
}; 