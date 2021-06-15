/* eslint-disable import/prefer-default-export */
import type { NextApiRequest } from 'next';
import cookie from 'cookie';

export const parseCookies = (req: NextApiRequest) => (
  cookie.parse(req.headers.cookie ?? '') ?? ''
);