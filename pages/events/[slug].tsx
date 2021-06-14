import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';
import styles from 'styles/Event.module.css';

interface Props {
  event: EventType
}

interface QuerySlugType {
  slug: string | number
}

interface ServerSideProps {
  query: QuerySlugType
}

const EventPage: NextPage<Props> = ({ event }) => {
  const router = useRouter();


  return (
    <Layout title="Event">
       <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
        </span>
        <h1>{event.name}</h1>

        <div className={styles.image}>
          <Image
            src={
              event.image[event.image.length - 1]?.formats?.large?.url
              || '/images/event-default.png'
            }
            width={960}
            height={600}
          />
        </div>

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export const getServerSideProps = async (
  { query: { slug } }: ServerSideProps,
) => {
  const res = await axiosInstance(`/events/?slug=${slug}`);

  return {
    props: {
      event: res.data[0],
    },
  };
};
