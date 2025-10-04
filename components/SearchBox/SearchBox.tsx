'use client';

import { useState, useEffect } from 'react';
import styles from './SearchBox.module.css';

interface Props {
    onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    return (
        <div className={styles.searchBox}>
            <input
                type='text'
                placeholder='Search notes...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.input}
                />
        </div>
    );
}