import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { isDevelopmentMode } from 'helper/isDevelopmentMode';
import { FETCH_METHODS } from 'constants_types/constants';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === FETCH_METHODS.post) {

    // Destroy cookie

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
      httpOnly: true,
      secure: !isDevelopmentMode(), // secure work only in production
      expires: new Date(0),
      sameSite: 'strict',
      path: '/', // for everywhere
    }));

    res.
    status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Allow', [FETCH_METHODS.post]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};