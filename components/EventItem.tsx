import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { EventType } from 'constants_types/types';
import styles from 'styles/EventItem.module.css';

interface Props {
  eventItem: EventType
}

const EventItem: NextPage<Props> = ({ eventItem }) => (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            eventItem.image[0].formats.thumbnail.url
            || '/images/event-default.png'
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(eventItem.date).toLocaleDateString('en-US')} at {eventItem.time}
        </span>
        <h3>{eventItem.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${eventItem.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );

export default EventItem;