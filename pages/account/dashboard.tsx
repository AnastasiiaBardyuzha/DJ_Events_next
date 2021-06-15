import { NextPage } from 'next';
import type { NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import DashboardEvent from 'components/DashboardEvent';
import { parseCookies } from 'helper/parseCookies';
import axiosInstance from 'api';
import { notifyError, notifySuccess } from 'helper/notify';
import { EventType } from 'constants_types/types';
import styles from 'styles/Dashboard.module.css';

interface ServerSideProps {
  req: NextApiRequest
}

interface Props {
  events?: Array<EventType>,
  token: string
}

const Dashboard: NextPage<Props> = ({
  events,
  token,
}) => {
  const router = useRouter();

  const deleteEvent = async (id: string | number) => {
    if (!confirm('Are you sure?')) return;

    try {
      await axiosInstance.delete(`/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      );
      notifySuccess('Successfully delete');
      router.reload();
    } catch (error) {
      notifyError();
    }
  };

  return (
    <Layout title="Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events?.map((evt) => (
          <DashboardEvent
            key={evt.id}
            eventItem={evt}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps = async (
  { req }: ServerSideProps,
) => {

  const { token } = parseCookies(req);
  
  const res = await axiosInstance.get(
    '/events/me',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  
  return {
    props: {
      events: res.data,
      token,
    },
  };
};
