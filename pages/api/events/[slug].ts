import { EventType } from 'constants_types/types';

const { events } = require('./data.json');

export default (req: any, res: any) => {
  const evt = events.filter((ev: EventType) => ev.slug === req.query.slug);

  if (req.method === 'GET') {
    res.status(200).json(evt);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};