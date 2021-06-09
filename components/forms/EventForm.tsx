import { useState, SyntheticEvent, ChangeEventHandler } from 'react';
import { NextPage } from 'next';
import moment from 'moment';
import { notifyError } from 'helper/notify';
import { addEventStructure } from 'utils/structures';
import { EventType } from 'constants_types/types';
import { actType } from 'constants_types/constants';
import styles from 'styles/Form.module.css';

interface FormValues {
  [key: string]: string,
}

interface Props {
  eventItem?: EventType,
  handleSubmit: (values: FormValues) => void,
  act: string
}

interface StructureItemType {
  label: string,
  nameItem: string,
  id: string,
  type: string,
}

const EventForm: NextPage<Props> = ({
  eventItem = {},
  handleSubmit,
  act,
}) => {
  const [values, setValues] = useState<FormValues>({
    name: eventItem?.name || '',
    venue: eventItem?.venue || '',
    performers: eventItem?.performers || '',
    description: eventItem?.description || '',
    date: moment(eventItem?.date).format('yyy-MM-DD') || '',
    time: eventItem?.time || '',
    address: eventItem?.address || '',
  });

  const handleInputChange: 
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> 
  = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const hasEmptyValue = Object.values(values)
    .some((value: string) => value === '');

    if (hasEmptyValue) {
      notifyError('Please, fill all fields');
      return;
    }

    handleSubmit(values);
  };

  return (
    <form
      onSubmit={onSubmit}
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
        value={`${actType[act]} Event`}
        className='btn'
      />
    </form>
  );
};

export default EventForm;
