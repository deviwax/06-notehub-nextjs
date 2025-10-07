import axios from "axios";
import { Note } from "@/types/note";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NewNote {
    title: string;
    content: string;
}

export async function createNote(newNote: NewNote): Promise<Note> {
    const response = await axios.post<Note>(`${API_URL}/notes.`, newNote, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}