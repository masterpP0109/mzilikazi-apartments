// Database types matching the Supabase schema

export type EnquiryStatus = 'new' | 'responded' | 'booked' | 'closed';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Enquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  arrival_date: string;
  departure_date: string;
  guests: number;
  message?: string;
  apartment_preference?: string;
  status: EnquiryStatus;
  source: string;
}

export interface Guest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  notes?: string;
}

export interface ApartmentRecord {
  id: string;
  slug: string;
  name: string;
  active: boolean;
}

export interface Booking {
  id: string;
  created_at: string;
  apartment_id: string;
  guest_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: BookingStatus;
  total_amount?: number;
  currency: string;
  notes?: string;
  source: string;
}
