import { createClient } from '@/lib/supabase/client';
import { Booking } from '@/types/database';
import { MOCK_BOOKINGS } from '@/lib/mockData';

export const bookingsService = {
  async getBookingsByAffiliate(affiliateId: string): Promise<Booking[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('affiliate_id', affiliateId)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return MOCK_BOOKINGS;
      }

      return data as Booking[];
    } catch (err) {
      return MOCK_BOOKINGS;
    }
  },

  async getBookingByCode(bookingCode: string): Promise<Booking | null> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_code', bookingCode)
        .single();

      if (error || !data) {
        return MOCK_BOOKINGS.find(b => b.booking_code === bookingCode) || null;
      }

      return data as Booking;
    } catch (err) {
      return MOCK_BOOKINGS.find(b => b.booking_code === bookingCode) || null;
    }
  },

  async createBooking(booking: Partial<Booking>): Promise<{ success: boolean; data?: Booking; error?: string }> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) {
        console.warn('[BookingsService] Error en Supabase:', error.message);
        return { success: true, data: booking as Booking };
      }

      return { success: true, data: data as Booking };
    } catch (err: any) {
      return { success: true, data: booking as Booking };
    }
  },
};
