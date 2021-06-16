import { NextPage } from 'next';
import type { NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import { notifyError } from 'helper/notify';
import { parseCookies } from 'helper/parseCookies';
import CustomLink from 'components/common/CustomLink';
import Layout from 'components/Layout';
import EventForm from 'components/forms/EventForm'; 
import axiosInstance from 'api';
import { FormValues } from 'interfaces';

interface ServerSideProps {
  req: NextApiRequest
}

interface Props {
  token: string
}

const AddEvent: NextPage<Props> = ({ token }) => {

  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await axiosInstance.post(
        '/events',
        { ...values},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const eventItem = res.data;
      
      router.push(`/events/${eventItem.slug}`);
    } catch(er) {
      const { status } = er.response;
      
      if ([403, 401].includes(status)) {
        notifyError('Unauthorized');
        return;
      }

      notifyError();
    };
  };

  return (
    <Layout title="Add New Event">
      <CustomLink href='/events'>
        {'<'} Go to Events
      </CustomLink>
      <h1>Add Event</h1>

      <EventForm
        handleSubmit={handleSubmit}
        act="add"
      />
      
    </Layout>
  );
};

export default AddEvent;

export async function getServerSideProps({ req }: ServerSideProps) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
