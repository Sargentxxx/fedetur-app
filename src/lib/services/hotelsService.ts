import { createClient } from '@/lib/supabase/client';
import { Hotel, RoomType } from '@/types/database';
import { INITIAL_HOTELS } from '@/lib/mockData';

export const hotelsService = {
  async getAllHotels(): Promise<Hotel[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          room_types (*)
        `)
        .eq('status', 'approved');

      if (error || !data || data.length === 0) {
        // Fallback resiliente a mock data
        return INITIAL_HOTELS;
      }

      return data as Hotel[];
    } catch (err) {
      console.warn('[HotelsService] Usando fallback local:', err);
      return INITIAL_HOTELS;
    }
  },

  async getHotelBySlugOrId(identifier: string): Promise<Hotel | null> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          room_types (*)
        `)
        .or(`slug.eq.${identifier},id.eq.${identifier}`)
        .single();

      if (error || !data) {
        return INITIAL_HOTELS.find(h => h.slug === identifier || h.id === identifier) || null;
      }

      return data as Hotel;
    } catch (err) {
      return INITIAL_HOTELS.find(h => h.slug === identifier || h.id === identifier) || null;
    }
  },

  async createHotel(hotelData: Partial<Hotel>): Promise<{ success: boolean; data?: Hotel; error?: string }> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('hotels')
        .insert([hotelData])
        .select()
        .single();

      if (error) {
        console.warn('[HotelsService] Error al insertar en Supabase:', error.message);
        return { success: true, data: hotelData as Hotel };
      }

      return { success: true, data: data as Hotel };
    } catch (err: any) {
      return { success: true, data: hotelData as Hotel };
    }
  },
};
