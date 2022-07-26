import React from 'react';
import ReactPaginate from 'react-paginate';

import { useAppDispatch } from '../../redux/store';
import { setCurrentPage } from '../../redux/filter/slice';

import styles from './Pagination.module.scss';

export const Pagination: React.FC = () => {
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
