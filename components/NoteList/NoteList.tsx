'use client';

import { Note } from '@/types/note';
import NoteItem from '../NoteItem/NoteItem';
import styles from './NoteList.module.css';

interface Props {
    notes: Note[];
}

export default function NoteList({ notes }: Props) {
    if (!notes.length) {
        return <p>No notes found.</p>;
    }

    return (
        <div className={styles.list}>
            {notes.map(note => (
                <NoteItem key={note.id} note={note} />
            ))}
        </div>
    );
}