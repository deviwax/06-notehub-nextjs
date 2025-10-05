import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { QueryClient } from '@tanstack/react-query'; 
import NotesClient from './Notes.client';

export default async function Page() {
    const queryClient = new QueryClient();

    const page = 1;
    const search = '';

    await queryClient.prefetchQuery({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes(page, search),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
}