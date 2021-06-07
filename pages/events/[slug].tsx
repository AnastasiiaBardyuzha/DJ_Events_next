import React from 'react';
import { NextPage } from 'next';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Layout from 'components/Layout';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';
import styles from 'styles/Event.module.css';

interface Props {
  event: EventType
}

const EventPage: NextPage<Props> = ({ event }) => {
  const deleteEvent = (e: React.MouseEvent) => {
    console.log('delete');
    console.log(e);
    
  };

  return (
    <Layout title="Event">
       <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
        </span>
        <h1>{event.name}</h1>

        <div className={styles.image}>
          <Image
            src={
              event.image[0].formats.large.url
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

interface QuerySlugType {
  slug: string | number
}

interface ServerSideProps {
  query: QuerySlugType
}

export const getServerSideProps = async ({ query: { slug } }: ServerSideProps) => {
  const res = await axiosInstance(`/events/?slug=${slug}`);
  const data = await res.data;

  return {
    props: {
      event: data[0],
    },
  };
};
