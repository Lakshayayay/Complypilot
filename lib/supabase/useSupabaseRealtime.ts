import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { createClient } from './client';

export function useSupabaseRealtime(
  deadlineId: string | null,
  onCommentAdded: (comment: any) => void,
) {
  const { data: session } = useSession();
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    if (!session?.accessToken || !deadlineId) return;

    // Set the NextAuth JWT token on the Supabase client so WebSocket RLS is active
    supabase.auth.setSession({
      access_token: session.accessToken,
      refresh_token: '',
    });

    // Subscribe to INSERT events on the Comment table for the selected deadline
    const channel = supabase
      .channel(`comments:${deadlineId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment',
          filter: `deadlineId=eq.${deadlineId}`,
        },
        (payload) => {
          onCommentAdded(payload.new);
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to live comments for deadline: ${deadlineId}`);
        } else if (status === 'CHANNEL_ERROR') {
          console.error(`Supabase Realtime Channel error for deadline: ${deadlineId}`);
        }
      });

    return () => {
      console.log(`Unsubscribing from comments for deadline: ${deadlineId}`);
      supabase.removeChannel(channel);
    };
  }, [session, deadlineId, supabase, onCommentAdded]);
}
