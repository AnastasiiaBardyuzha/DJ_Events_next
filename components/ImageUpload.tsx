import {
  useState,
  SyntheticEvent,
  ChangeEvent,
} from 'react';
import { NextPage } from 'next';
import axiosInstance from 'api';
import { notifyError } from 'helper/notify';
import styles from 'styles/Form.module.css';

interface Props {
  evtId: string,
  imageUploaded: () => void,
  token: string
}

const ImageUpload: NextPage<Props> = ({
  evtId,
  imageUploaded,
  token,
}) => {
  const [image, setImage] = useState<string | Blob>('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    try {

      await axiosInstance.post(
        '/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      imageUploaded();

    } catch (er){
      const { status } = er.response;
      console.log(status);
      
      if ([403, 401].includes(status)) {
        notifyError('Unauthorized');
        return;
      }
      notifyError();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setImage(target.files?.length ? target.files[0] : '');
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input
            type='file'
            onChange={handleFileChange}
          />
        </div>
        <input
          type='submit'
          value='Upload'
          className='btn' />
      </form>
    </div>
  );
};

export default ImageUpload;