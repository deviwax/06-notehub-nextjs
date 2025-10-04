import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { QueryClient } from '@tanstack/react-query'; 
import NotesClient from '../Notes.client';

export default async function Page() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
}