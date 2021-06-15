import {
  useState,
  ChangeEventHandler,
  SyntheticEvent,
} from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/Search.module.css';

const Search = () => {
  const [term, setTerm] = useState('');

  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setTerm(value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Search;