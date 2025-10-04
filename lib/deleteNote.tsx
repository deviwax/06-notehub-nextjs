import axios from 'axios';

const BASE_URL = 'https://notehub.webdev.goit.global/api/';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function deleteNote(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}