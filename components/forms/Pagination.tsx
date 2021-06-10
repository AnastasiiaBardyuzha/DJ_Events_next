import { NextPage } from 'next';
import Link from 'next/link';
import { PER_PAGE } from 'constants_types/constants';

interface Props {
  total: number,
  page: number,
}

const Pagination: NextPage<Props> = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <>
    { page > 1  && (
      <Link 
        href={`/events?page=${page - 1}`}
      >
        <a className='btn-secondary'>Prev</a>
      </Link>
    )}

    { page < lastPage  && (
      <Link 
        href={`/events?page=${page + 1}`}
      >
        <a className='btn-secondary'>Next</a>
      </Link>
    )}
    </>
  );
};

export default Pagination;
