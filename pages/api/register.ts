import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import axiosInstance from 'api';
import { isDevelopmentMode } from 'helper/isDevelopmentMode';
import { FETCH_METHODS } from 'utils/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === FETCH_METHODS.post) {
    const {username, email,  password} = req.body;

    try {
      const strapiRes = await axiosInstance.post(
        '/auth/local/register',
        {username, email, password},
      );
      const {data} = strapiRes;

      // Set cookie

      res.setHeader('Set-Cookie', cookie.serialize('token', String(data.jwt), {
        httpOnly: true,
        secure: !isDevelopmentMode(), // secure work only in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/', // for everywhere
      }));

      res.status(200).json({ user: data.user });
    } catch (error) {
      const {data} = error.response;
      
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }

  } else {
    res.setHeader('Allow', [FETCH_METHODS.post]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};