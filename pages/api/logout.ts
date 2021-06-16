import type { NextApiRequest, NextApiResponse } from 'next';
import { actionWithCookies } from 'helper/cookies';
import { FETCH_METHODS, COOKIES_ACTIONS } from 'utils/constants';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === FETCH_METHODS.post) {

    // Destroy cookie

    actionWithCookies({
      act: COOKIES_ACTIONS.destroy,
      res,
    });

    res.
    status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Allow', [FETCH_METHODS.post]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};