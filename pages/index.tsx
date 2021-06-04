import { FC } from 'react';
import Layout from 'components/Layout';
import axiosInstance from 'api/index';
import { EventType } from 'constants_types/types';

interface Props {
  events?: Array<EventType> | []
}

 const Home: FC<Props> = ({ events }) => {
   console.log(events);
  return (
    <div>
      <Layout>
        <h1>Home</h1>
      </Layout>  
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await axiosInstance('/api/events');
  const data = await res.data;
  
  return {
    props: {
      events: data,
    },
  };
};
