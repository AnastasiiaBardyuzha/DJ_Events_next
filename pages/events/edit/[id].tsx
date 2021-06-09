import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EventForm from 'components/forms/EventForm'; 
import Layout from 'components/Layout';
import { notifyError, notifySuccess } from 'helper/notify';
import axiosInstance from 'api';
import { EventType, FormValues } from 'constants_types/types';

interface Props {
  eventItem: EventType
}

interface QuerySlugType {
  id: string | number
}

interface ServerSideProps {
  query: QuerySlugType
}

const EditEvent: NextPage<Props> = ({ eventItem }) => {

  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      await axiosInstance.put(`/events/${eventItem.id}`, { ...values});
      router.push('/events');
      notifySuccess();
    } catch(er) {     
      notifyError();
    };
  };

  return (
    <Layout title="Add New Event">
      <Link href='/events'>
        <a>{'<'} Go Back</a>
      </Link>
      <h1>Edit Event</h1>

      <EventForm eventItem={eventItem} handleSubmit={handleSubmit} act="update" />

    </Layout>
  );
};

export default EditEvent;

export const getServerSideProps = async (
  { query: { id } }: ServerSideProps,
) => {
  const res = await axiosInstance(`/events/?id=${id}`);
  const data = await res.data;

  return {
    props: {
      eventItem: data[0],
    },
  };
};
