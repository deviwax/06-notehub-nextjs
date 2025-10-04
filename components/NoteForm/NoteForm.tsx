'use client';

import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from "@/lib/createNote";
import styles from './NoteForm.module.css';

export default function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            setTitle('');
            setContent('');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
        mutate({ title, content });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Create New Note</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={styles.textarea}
                required
            />
            <button type="submit" className={styles.button} disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Note'}
            </button>
            {isError && <p className={styles.error}>Error: {error.message}</p>}
        </form>
    );
}