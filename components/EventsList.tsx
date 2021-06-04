import { FC } from 'react';
import Layout from 'components/Layout';
import EventItem from 'components/EventItem';
import { EventType } from 'constants_types/types';

interface Props {
  events?: Array<EventType>
}

 const EventsList: FC<Props> = ({ events }) => (
    <Layout>
      {!events && <h3>No events to show</h3>}
      {events?.map((event: EventType) => (
          <EventItem eventItem={event} key={event.id} />
        ),
      )}
    </Layout>  
  );

export default EventsList;