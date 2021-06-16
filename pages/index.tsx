import { NextPage } from 'next';
import CustomLink from 'components/common/CustomLink';
import Layout from 'components/Layout';
import EventsList from 'components/EventsList';
import axiosInstance from 'api';
import { EventType } from 'interfaces';

interface Props {
  events?: Array<EventType>
}

 const Home: NextPage<Props> = ({ events }) => (
    <Layout>
      <h1>Upcoming Events</h1>
      <EventsList events={events} />
      {events && (
        <CustomLink 
          href="/events"
          className="btn-secondary"
        >
          View All Events
        </CustomLink>
      )}
    </Layout>
  );

export default Home;

export const getServerSideProps = async () => {
  const res = await axiosInstance.get('/events?_sort=date:ASC&_limit=3');
  
  return {
    props: {
      events: res.data,
    },
  };
};
