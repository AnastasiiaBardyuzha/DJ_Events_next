import { NextPage } from 'next';
import Image from 'next/image';
import CustomLink from 'components/common/CustomLink';
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
            eventItem.image[eventItem.image.length - 1]?.formats?.thumbnail?.url
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
        <CustomLink
          href={`/events/${eventItem.slug}`}
          className='btn'
        >
          Details
        </CustomLink>
      </div>
    </div>
  );

export default EventItem;