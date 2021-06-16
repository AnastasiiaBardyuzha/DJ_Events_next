import { NextPage } from 'next';
import EventItem from 'components/EventItem';
import { EventType } from 'interfaces';

interface Props {
  events?: Array<EventType>
}

 const EventsList: NextPage<Props> = ({ events }) => (
    <>
      {!events?.length && <h3>No events to show</h3>}
      {events?.map((event: EventType) => (
          <EventItem
            eventItem={event}
            key={event.id}
          />
        ),
      )}
    </>  
  );

export default EventsList;