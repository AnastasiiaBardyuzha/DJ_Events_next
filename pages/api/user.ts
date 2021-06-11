import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import axiosInstance from 'api/index';
import { isDevelopmentMode } from 'helper/isDevelopmentMode';
import { FETCH_METHODS } from 'constants_types/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === FETCH_METHODS.get) {
   if(!req.headers.cookie) {
     res.status(403).json({ message: 'Not Authorized' });
     return;
   }

   try {
    const {token} = cookie.parse(req.headers.cookie);
    const strapiRes = await axiosInstance(
      '/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const {data} = strapiRes;
    console.log('userData: ', data);

    res.status(200).json({ user: data });
  } catch (error) {
    res
      .status(403)
      .json({ message: 'User forbidden' });
  }

  } else {
    res.setHeader('Allow', [FETCH_METHODS.get]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};