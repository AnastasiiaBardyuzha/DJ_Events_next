import { useState, SyntheticEvent, ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { notifyError } from 'helper/notify';
import Layout from 'components/Layout';
import styles from 'styles/Form.module.css';
import axiosInstance from 'api';
// import { API_URL } from 'constants_types/constants';

interface FormValues {
  name: string,
  venue: string,
  performers: string,
  description: string,
  date: string,
  time: string,
  address: string,
}

const AddEvent = () => {
  const [values, setValues] = useState<FormValues>({
    name: '',
    venue: '',
    performers: '',
    description: '',
    date: '',
    time: '',
    address: '',
  });

  const router = useRouter();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    
    // Validate

    const hasEmptyValue = Object.values(values)
      .some((value: string) => value === '');

    if (hasEmptyValue) {
      notifyError('Please, fill all fields');
      return;
    }

    try {
      const res = await axiosInstance.post('/events', { ...values});
      const eventItem = res.data;
      console.log(eventItem);
      
      router.push(`/events/${eventItem.slug}`);
    } catch(er) {     
      notifyError();
    };
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }; 

  return (
    <Layout title="Add New Event">
      <Link href='/events'>
        <a>{'<'} Go Back</a>
      </Link>
      <h1>Add Event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>
              Event Name
              <input
                type='text'
                id='name'
                name='name'
                value={values.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor='performers'>
              Performers
              <input
                type='text'
                name='performers'
                id='performers'
                value={values.performers}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor='venue'>
              Venue
              <input
                type='text'
                name='venue'
                id='venue'
                value={values.venue}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor='address'>
              Address
              <input
                type='text'
                name='address'
                id='address'
                value={values.address}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor='date'>
              Date
              <input
                type='date'
                name='date'
                id='date'
                value={values.date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor='time'>
              Time
              <input
                type='text'
                name='time'
                id='time'
                value={values.time}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor='description'>
            Event Description
            <textarea
              name='description'
              id='description'
              value={values.description}
              onChange={handleInputChange}
             />
          </label>
        </div>

        <input type='submit' value='Add Event' className='btn' />
      </form>
    </Layout>
  );
};

export default AddEvent;
