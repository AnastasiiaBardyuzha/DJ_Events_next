import {
  useState,
  SyntheticEvent,
  ChangeEventHandler,
} from 'react';
import { NextPage } from 'next';
import { notifyError } from 'helper/notify';
import { registerStructure } from 'utils/structures';
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

const RegisterForm: NextPage<Props> = ({
  handleSubmit,
}) => {
  const [values, setValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const { password, confirmPassword } = values;
    const hasEmptyValue = Object.values(values)
    .some((value: string) => value === '');

    if (hasEmptyValue) {
      notifyError('Please, fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      notifyError('Passwords do not match!');
      return;
    }

    handleSubmit(values);
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <div>
        {registerStructure.map((event: StructureItemType) => (
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
        value="Sign Up"
        className='btn'
      />
    </form>
  );
};

export default RegisterForm;
