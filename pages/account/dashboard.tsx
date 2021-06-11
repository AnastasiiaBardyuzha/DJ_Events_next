import { NextPage } from 'next';
import type { NextApiRequest } from 'next';
import Layout from 'components/Layout';
import DashboardEvent from 'components/DashboardEvent';
import { parseCookies } from 'helper/parseCookies';
// import Pagination from 'components/forms/Pagination';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';
import styles from 'styles/Dashboard.module.css';

interface ServerSideProps {
  req: NextApiRequest
}

interface Props {
  events?: Array<EventType>,
}

const Dashboard: NextPage<Props> = ({
  events,
}) => {
  const deleteEvent = (id: string | number) => {
    console.log('delete: ', id);
  };

  return (
    <Layout title="Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events?.map((evt) => (
          <DashboardEvent key={evt.id} eventItem={evt} handleDelete={deleteEvent} />
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

  const res = await axiosInstance('/events/me', {headers: {
    Authorization: `Bearer ${token}`,
  }});
  
  return {
    props: {
      events: res.data,
    },
  };
};
