export type UserRole = 'afiliado' | 'hotel_admin' | 'super_admin';

export type Region = 'NEA' | 'NOA' | 'Centro' | 'Cuyo' | 'Buenos Aires' | 'Patagonia' | 'Malvinas';

export type BookingStatus = 'pending_payment' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';

export type HotelStatus = 'pending' | 'approved' | 'rejected' | 'paused';

export interface AffiliatedEntity {
  id: string;
  name: string;
  acronym: string;
  entity_type: 'mutual' | 'cooperativa' | 'federacion';
  inaes_matricula?: string;
  province: string;
  region: Region;
  contact_email?: string;
  contact_phone?: string;
  logo_url?: string;
  status: 'active' | 'inactive';
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  dni_cuit?: string;
  phone?: string;
  role: UserRole;
  entity_id?: string;
  entity_name?: string;
  is_verified: boolean;
  avatar_url?: string;
  created_at: string;
}

export interface RoomType {
  id: string;
  hotel_id: string;
  name: string;
  description: string;
  capacity_adults: number;
  capacity_children: number;
  bed_configuration: string;
  base_price_night: number;
  fedetur_discount_percentage: number;
  total_inventory: number;
  images: string[];
  amenities: string[];
  is_active: boolean;
}

export interface Hotel {
  id: string;
  owner_id?: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  region: Region;
  province: string;
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  contact_email: string;
  contact_phone: string;
  whatsapp?: string;
  website?: string;
  amenities: string[];
  images: string[];
  star_rating: number;
  check_in_time: string;
  check_out_time: string;
  status: HotelStatus;
  featured: boolean;
  room_types?: RoomType[];
  created_at: string;
}

export interface BookingGuest {
  full_name: string;
  dni: string;
  is_primary: boolean;
}

export interface Booking {
  id: string;
  booking_code: string;
  affiliate_id: string;
  affiliate_name?: string;
  affiliate_dni?: string;
  hotel_id: string;
  hotel_name?: string;
  hotel_city?: string;
  hotel_image?: string;
  room_type_id: string;
  room_name?: string;
  check_in_date: string;
  check_out_date: string;
  nights_count: number;
  guests_count: number;
  guest_details: BookingGuest[];
  price_per_night: number;
  subtotal: number;
  discount_amount: number;
  total_amount: number;
  status: BookingStatus;
  special_requests?: string;
  payment_id?: string;
  payment_status?: string;
  created_at: string;
}

export interface PaymentTransaction {
  id: string;
  booking_id: string;
  mp_preference_id?: string;
  mp_payment_id?: string;
  mp_status: 'approved' | 'pending' | 'in_process' | 'rejected' | 'refunded';
  mp_payment_type?: string;
  amount: number;
  currency: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  user_email?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  ip_address?: string;
  details: Record<string, any>;
  created_at: string;
}
