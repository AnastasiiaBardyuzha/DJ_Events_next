import { NextPage } from 'next';
import CustomLink from 'components/common/CustomLink';
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
        <CustomLink
          href={`/events/${eventItem.slug}`}
        >
          {eventItem.name}
        </CustomLink>
      </h4>
      <CustomLink
        href={`/events/edit/${eventItem.id}`}
        className={styles.edit}
      >
        <FaPencilAlt /> <span>Edit Event</span>
      </CustomLink>
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