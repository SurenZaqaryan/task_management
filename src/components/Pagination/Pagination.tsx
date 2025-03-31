import { memo } from 'react';
import styles from './style.module.css';

type PaginationProps = {
  pageNumbers: number[];
  activePage: number;
  handleChangeActivePage: (page: number) => void;
};

function Pagination({ pageNumbers, activePage, handleChangeActivePage }: PaginationProps) {
  return (
    <div className={styles.page_numbers_wrapper}>
      {pageNumbers.map((page: number) => {
        return (
          <div
            style={{
              color: activePage === page ? 'rgb(55, 130, 134)' : 'rgb(90, 90, 90)',
              border:
                activePage === page ? '1px solid rgb(55, 130, 134)' : '1px solid rgb(90, 90, 90)',
            }}
            className={styles.page_number}
            key={page}
            onClick={() => handleChangeActivePage(page)}>
            {page}
          </div>
        );
      })}
    </div>
  );
}

export default memo(Pagination);
