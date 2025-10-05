import axios from 'axios';
import { Note } from '@/types/note';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number = 1, search: string = ''): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, search },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createNote(note: { title: string; content?: string; tag: string }): Promise<Note> {
  const response = await axios.post<Note>(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<void> {
  await axios.delete(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}