import { NextPage } from 'next';
import Layout from 'components/Layout';
import EventsList from 'components/EventsList';
import Pagination from 'components/forms/Pagination';
import axiosInstance from 'api';
import { EventType } from 'interfaces';
import { PER_PAGE } from 'utils/constants';

interface QuerySlugType {
  page: string | number
}

interface ServerSideProps {
  query: QuerySlugType
}

interface Props {
  events?: Array<EventType>,
  total: number,
  page: number,
}

 const Events: NextPage<Props> = ({
  events,
  total,
  page,
}) => (
  <Layout>
    <h1>Events</h1>
    <EventsList events={events} />

    <Pagination
      page={page}
      total={total}
    />
  </Layout>
);

export default Events;

export const getServerSideProps = async (
  { query: { page = 1 } }: ServerSideProps,
) => {
  // Calculate start page

  const start = +page === 1 ? 0 :(+page - 1) * PER_PAGE;

  // get total/count

  const resTotal = await axiosInstance('/events/count');

  // get events

  const resEvents = await axiosInstance(
    `/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`,
  );
  
  return {
    props: {
      events: resEvents.data,
      total: resTotal.data,
      page: +page,
    },
  };
};
