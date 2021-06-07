import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import qs from 'qs';
import Layout from 'components/Layout';
import EventsList from 'components/EventsList';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';

interface Props {
  events?: Array<EventType>
}

 const SearchPage: NextPage<Props> = ({ events }) => {
  const { query } = useRouter();

   return (
    <Layout>
      <Link href='/events'>
        <a>{'<'} Go Back</a>
      </Link>
      <h1>Search Results for {query.term}</h1>
      <EventsList events={events} />
    </Layout>
  );
};

export default SearchPage;

interface QueryTermType {
  term: string
}

interface ServerSideProps {
  query: QueryTermType
}

export const getServerSideProps = async ({ query: { term } }: ServerSideProps) => {

  const querySearch = qs.stringify({
    _where: {
      _or: [
        {name_contains: term},
        {performers_contains: term},
        {venue_contains: term},
        {description_contains: term},
      ],
    },
  });
  const res = await axiosInstance(`/events?${querySearch}`);
  const events = await res.data;
  
  return {
    props: {
      events,
    },
  };
};
