import axios from "axios";
import { Note } from "@/types/note";

const BASE_URL = 'https://next-docs-9f0504b0a741.herokuapp.com/';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NewNote {
    title: string;
    content: string;
}

export async function createNote(newNote: NewNote): Promise<Note> {
    const response = await axios.post<Note>(`${BASE_URL}notes`, newNote, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}