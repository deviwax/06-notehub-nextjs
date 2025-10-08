'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { deleteNote } from '@/lib/api';
import NoteItem from '../NoteItem/NoteItem';
import { Note } from '@/types/note';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes?: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes().then(res => res.notes),
    enabled: !notes,
  });

  const notesToRender = notes || data;

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      mutate(id);
    }
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;
  if (!notesToRender || notesToRender.length === 0) return <p>No notes found.</p>;

  return (
    <div className={styles.list}>
      {notesToRender.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}