'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/deleteNote';
import { Note } from '@/types/note';
import Link from 'next/link';
import styles from '../NoteList/NoteList.module.css';

interface Props {
    note: Note;
}

export default function NoteItem({ note }: Props) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this note?')) {
            mutate(Number(note.id));
        }
    };

    return (
        <div className={styles.listItem}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className={styles.footer}>
                <Link href={`/notes/${note.id}`} className={styles.link}>View details</Link>
                <button onClick={handleDelete} disabled={isPending} className={styles.button}>
                    {isPending ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}