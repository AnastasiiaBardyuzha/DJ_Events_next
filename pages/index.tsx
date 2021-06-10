import { NextPage } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import EventsList from 'components/EventsList';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';

interface Props {
  events?: Array<EventType>
}

 const Home: NextPage<Props> = ({ events }) => (
    <Layout>
      <h1>Upcoming Events</h1>
      <EventsList events={events} />
      {events && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );

export default Home;

export const getServerSideProps = async () => {
  const res = await axiosInstance('/events?_sort=date:ASC&_limit=3');
  
  return {
    props: {
      events: res.data,
    },
  };
};
