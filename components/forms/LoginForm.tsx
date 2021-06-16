import { useState, SyntheticEvent, ChangeEventHandler } from 'react';
import { NextPage } from 'next';
import { notifyError } from 'helper/notify';
import { loginStructure } from 'utils/structures';
import { FormValues } from 'interfaces';

interface Props {
  handleSubmit: (values: FormValues) => void,
}

interface StructureItemType {
  label: string,
  nameItem: string,
  id: string,
  type: string,
}

const LoginForm: NextPage<Props> = ({
  handleSubmit,
}) => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const handleInputChange: 
    ChangeEventHandler<HTMLInputElement> 
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
    >
      <div>
        {loginStructure.map((event: StructureItemType) => (
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

      <input
        type='submit'
        value="Sign In"
        className='btn'
      />
    </form>
  );
};

export default LoginForm;
