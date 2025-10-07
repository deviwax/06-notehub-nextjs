import axios from 'axios';
import { Note } from '@/types/note';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function deleteNote(id: string): Promise<Note> {
    const response = await axios.delete <Note>(`${API_URL}/notes.${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}