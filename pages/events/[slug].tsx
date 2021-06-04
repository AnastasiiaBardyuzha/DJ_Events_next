import { NextPage } from 'next';
import Layout from 'components/Layout';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';

interface Props {
  event: EventType
}

const EventPage: NextPage<Props> = ({ event }) => {
  console.log(event);

  return (
    <Layout title="Event">
      <h1>
        Some event
      </h1>
    </Layout>
  );
};

export default EventPage;

interface QuerySlugType {
  slug: string | number
}

interface ServerSideProps {
  query: QuerySlugType
}

export const getServerSideProps = async ({ query: { slug } }: ServerSideProps) => {
  const res = await axiosInstance(`/api/events/${slug}`);
  const data = await res.data;

  return {
    props: {
      event: data[0],
    },
  };
};
