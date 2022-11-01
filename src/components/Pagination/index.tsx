import React from 'react';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
