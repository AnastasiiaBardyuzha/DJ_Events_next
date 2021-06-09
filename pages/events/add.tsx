import { useRouter } from 'next/router';
import Link from 'next/link';
import { notifyError } from 'helper/notify';
import Layout from 'components/Layout';
import EventForm from 'components/forms/EventForm'; 
import axiosInstance from 'api';
import { FormValues } from 'constants_types/types';

const AddEvent = () => {

  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await axiosInstance.post('/events', { ...values});
      const eventItem = res.data;
      
      router.push(`/events/${eventItem.slug}`);
    } catch(er) {     
      notifyError();
    };
  };

  return (
    <Layout title="Add New Event">
      <Link href='/events'>
        <a>{'<'} Go Back</a>
      </Link>
      <h1>Add Event</h1>

      <EventForm handleSubmit={handleSubmit} act="add" />
      
    </Layout>
  );
};

export default AddEvent;
