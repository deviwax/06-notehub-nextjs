import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://next-docs-9f0504b0a741.herokuapp.com/';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(): Promise <Note[]> {
    const response = await axios.get(`${BASE_URL}notes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('fetchNotes response:', response.data);
    return response.data.notes;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await axios.get<Note>(`${BASE_URL}notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}