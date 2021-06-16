import { NextPage } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import CustomLink from 'components/common/CustomLink';
import Layout from 'components/Layout';
import EventsList from 'components/EventsList';
import axiosInstance from 'api';
import { EventType } from 'interfaces';

interface Props {
  events?: Array<EventType>
}

interface QueryTermType {
  term: string
}

interface ServerSideProps {
  query: QueryTermType
}

 const SearchPage: NextPage<Props> = ({ events }) => {
  const { query } = useRouter();

   return (
    <Layout>
      <CustomLink href='/events'>
        {'<'} Go to Events
      </CustomLink>
      <h1>
        Search Results for {query.term}
      </h1>
      <EventsList events={events} />
    </Layout>
  );
};

export default SearchPage;

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
  
  return {
    props: {
      events: res.data,
    },
  };
};
