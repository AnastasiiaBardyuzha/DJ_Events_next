import { NextPage } from 'next';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { EventType } from 'constants_types/types';
import styles from 'styles/DashboardEvent.module.css';

interface Props {
  eventItem: EventType,
  handleDelete: (id: string| number) => void;
}

const DashboardEvent: NextPage<Props> = ({ eventItem, handleDelete }) => (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${eventItem.slug}`}>
          <a>{eventItem.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${eventItem.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(eventItem.id)}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );

export default DashboardEvent;