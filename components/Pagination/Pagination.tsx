'use client';

import styles from './Pagination.module.css';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    return (
        <div className={styles.pagination}>
            <button onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1} className={styles.button}>
                Previous
            </button>

            <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
            </span>

            <button onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages} className={styles.button}>
                Next
            </button>
        </div>
    );
}