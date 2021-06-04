import { NextPage } from 'next';
import EventItem from 'components/EventItem';
import { EventType } from 'constants_types/types';

interface Props {
  events?: Array<EventType>
}

 const EventsList: NextPage<Props> = ({ events }) => (
    <>
      {!events && <h3>No events to show</h3>}
      {events?.map((event: EventType) => (
          <EventItem eventItem={event} key={event.id} />
        ),
      )}
    </>  
  );

export default EventsList;