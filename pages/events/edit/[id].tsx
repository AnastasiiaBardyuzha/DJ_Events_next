import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import EventForm from 'components/forms/EventForm'; 
import Layout from 'components/Layout';
import ImageUpload from 'components/ImageUpload';
import Modal from 'components/Modal';
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
  const [imagePreview, setImagePreview] = useState<string | null>(
    eventItem?.image[eventItem.image.length - 1]?.formats?.thumbnail?.url
    || null,
  );
  const [showModal, setShowModal] = useState<boolean>(false);

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
      <Link href='/events'>
        <a>{'<'} Go Back</a>
      </Link>
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
              || '/images/event-default.png'
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
        />
      </Modal>

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
