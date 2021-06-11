import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from 'api/index';
import { FETCH_METHODS } from 'constants_types/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === FETCH_METHODS.post) {
    const {identifier, password} = req.body;

    try {
      const strapiRes = await axiosInstance.post(
        '/auth/local', {identifier, password},
      );
      const {data} = strapiRes;

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