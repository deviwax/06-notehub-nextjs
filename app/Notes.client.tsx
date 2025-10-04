'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function NotesClient() {
    const [searchQuery, setSearchQuery] = useState('');

    const { data: notes = [], isLoading, isError, error } = useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
    });

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError) return <p>Something went wrong: {error.message}</p>;

    return (
        <>
            <SearchBox onSearch={setSearchQuery} />
            <NoteList notes={filteredNotes} />
        </>
    );
}