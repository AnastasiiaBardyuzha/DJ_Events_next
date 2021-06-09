import { useState, SyntheticEvent, ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { notifyError } from 'helper/notify';
import Layout from 'components/Layout';
import axiosInstance from 'api';
import { addEventStructure } from 'utils/structures';
import styles from 'styles/Form.module.css';

interface FormValues {
  [key: string]: string,
}

interface StructureItemType {
  label: string,
  nameItem: string,
  id: string,
  type: string,
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
      
      router.push(`/events/${eventItem.slug}`);
    } catch(er) {     
      notifyError();
    };
  };

  const handleInputChange: 
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> 
  = (event) => {
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

      <form
        onSubmit={handleSubmit}
        className={styles.form}>
        <div className={styles.grid}>
          {addEventStructure.map((event: StructureItemType) => (
            <div key={event.id}>
            <label htmlFor={event.nameItem}>
              {event.label}
              <input
                type={event.type}
                id={event.id}
                name={event.nameItem}
                value={values[event.nameItem]}
                onChange={handleInputChange}
              />
            </label>
          </div>
          ))}
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

        <input
          type='submit'
          value='Add Event'
          className='btn'
        />
      </form>
    </Layout>
  );
};

export default AddEvent;
