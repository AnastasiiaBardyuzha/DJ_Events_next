import { NextPage } from 'next';
import CustomLink from 'components/common/CustomLink';
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
      <CustomLink 
        href={`/events?page=${page - 1}`}
        className='btn-secondary'
      >
        Prev
      </CustomLink>
    )}

    { page < lastPage  && (
      <CustomLink 
        href={`/events?page=${page + 1}`}
        className='btn-secondary'
      >
        Next
      </CustomLink>
    )}
    </>
  );
};

export default Pagination;
