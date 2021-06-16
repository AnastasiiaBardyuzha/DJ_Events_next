import { useState } from 'react';
import { NextPage, NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import CustomLink from 'components/common/CustomLink';
import EventForm from 'components/forms/EventForm'; 
import Layout from 'components/Layout';
import ImageUpload from 'components/ImageUpload';
import Modal from 'components/Modal';
import { notifyError, notifySuccess } from 'helper/notify';
import { parseCookies } from 'helper/parseCookies';
import axiosInstance from 'api';
import { EventType, FormValues } from 'interfaces';

interface Props {
  eventItem: EventType,
  token: string
}

interface QuerySlugType {
  id: string | number
}

interface ServerSideProps {
  query: QuerySlugType,
  req: NextApiRequest
}

const EditEvent: NextPage<Props> = ({
  eventItem,
  token,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    eventItem?.image[eventItem.image.length - 1]?.formats?.thumbnail?.url
    ?? null,
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      await axiosInstance.put(
        `/events/${eventItem.id}`,
        { ...values},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push('/events');
      notifySuccess();
    } catch(er) {  
      const { status } = er.response;
      
      if ([403, 401].includes(status)) {
        notifyError('Unauthorized');
        return;
      }
      notifyError();
    };
  };

  const imageUploaded = async () => {
    const res = await axiosInstance(`/events/${eventItem.id}`);
    const { data } = res;

    setImagePreview(
      data.image[data.image.length - 1].formats.thumbnail.url,
    );
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <CustomLink href='/events'>
        {'<'} Go to Events
      </CustomLink>
      <h1>Edit Event</h1>

      <EventForm
        eventItem={eventItem}
        handleSubmit={handleSubmit}
        act="update"
      />

      <h2>Even Image</h2>
      {imagePreview ? 
        (
          <Image
            src={
              imagePreview
              ?? '/images/event-default.png'
            }
            width={170}
            height={100}
          />
        ) : 
        (
          <p>No image uploaded</p>
        )
      }

      <div>
        <button
          type="button"
          className='btn-secondary btn-icon'
          onClick={() => setShowModal(true)}
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        >
        <ImageUpload
          imageUploaded={imageUploaded}
          evtId={eventItem.id}
          token={token}
        />
      </Modal>

    </Layout>
  );
};

export default EditEvent;

export const getServerSideProps = async (
  {
    query: { id },
    req,
  }: ServerSideProps,
) => {
  const { token } = parseCookies(req);
  const res = await axiosInstance(`/events/?id=${id}`);
  
  return {
    props: {
      eventItem: res.data[0],
      token,
    },
  };
};
