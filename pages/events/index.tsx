import { NextPage } from 'next';
import Layout from 'components/Layout';
import EventsList from 'components/EventsList';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';

interface Props {
  events?: Array<EventType>
}

 const Events: NextPage<Props> = ({ events }) => (
    <Layout>
      <h1>Events</h1>
      <EventsList events={events} />
    </Layout>
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
