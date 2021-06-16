import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from 'api';
import { actionWithCookies } from 'helper/cookies';
import { FETCH_METHODS, COOKIES_ACTIONS } from 'utils/constants';

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

      actionWithCookies({
        act: COOKIES_ACTIONS.set,
        res,
        token: data.jwt,
      });

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