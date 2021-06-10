import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from 'api/index';
import { FETCH_METHODS, NEXT_URL } from 'constants_types/constants';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === FETCH_METHODS.post) {
    const {identifier, password} = req.body;

    console.log({identifier, password});

    res.status(200).json({});
  } else {
    res.setHeader('Allow', [FETCH_METHODS.post]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};