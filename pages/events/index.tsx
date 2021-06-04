import { FC } from 'react';
import EventsList from 'components/EventsList';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';

interface Props {
  events?: Array<EventType>
}

 const Events: FC<Props> = ({ events }) => (
    <EventsList events={events} />
  );

export default Events;

export const getServerSideProps = async () => {
  const res = await axiosInstance('/api/events');
  const data = await res.data;
  
  return {
    props: {
      events: data,
    },
  };
};
