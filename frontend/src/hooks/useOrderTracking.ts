import { supabase } from '../lib/supabase';
import { useEffect } from 'react';

export const useOrderTracking = (orderId: string | null) => {
  useEffect(() => {
    if (!orderId) return;

    const channel = supabase
      .channel(`order-updates-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          console.log('Order update received:', payload.new);
          // Update local state or trigger query refetch
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);
};
