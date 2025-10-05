import axios from 'axios';

const BASE_URL = 'https://next-docs-9f0504b0a741.herokuapp.com/';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function deleteNote(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}