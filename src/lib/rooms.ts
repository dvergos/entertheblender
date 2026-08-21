export interface Room {
  id: string;
  name: string;
  tagline: string | null;
  mood: string | null;
  description: string | null;
  long_description: string | null;
  images: string[];
  palette: string | null;
  size: number | null;
  capacity_adults: number;
  capacity_children: number;
  bed_configuration: string | null;
  price_weekday: number | null;
  price_weekend: number | null;
  amenities: string[];
  features: string[];
  views: string[];
  accessibility: string[];
  cancellation_policy: string | null;
  check_in: string;
  check_out: string;
  sort_order: number;
  is_available: boolean;
}

export const AMENITIES = [
  { id: 'wifi', label: 'Free WiFi' },
  { id: 'air_conditioning', label: 'Air Conditioning' },
  { id: 'heating', label: 'Heating' },
  { id: 'private_bathroom', label: 'Private Bathroom' },
  { id: 'shower', label: 'Rainfall Shower' },
  { id: 'bathtub', label: 'Bathtub' },
  { id: 'toiletries', label: 'Premium Toiletries' },
  { id: 'towels_linens', label: 'Towels & Linens' },
  { id: 'mini_fridge', label: 'Mini Fridge' },
  { id: 'coffee_tea', label: 'Coffee & Tea Maker' },
  { id: 'smart_tv', label: 'Smart TV' },
  { id: 'safe', label: 'In-Room Safe' },
  { id: 'desk', label: 'Work Desk' },
  { id: 'wardrobe', label: 'Wardrobe' },
  { id: 'balcony', label: 'Private Balcony / Terrace' },
  { id: 'garden_view', label: 'Garden View' },
  { id: 'city_view', label: 'City View' },
  { id: 'daily_housekeeping', label: 'Daily Housekeeping' },
  { id: 'towel_service', label: 'Towel Service' },
  { id: 'free_parking', label: 'Free Parking' },
  { id: 'breakfast', label: 'Breakfast Included' },
  { id: 'pet_friendly', label: 'Pet Friendly' },
  { id: 'blackout_curtains', label: 'Blackout Curtains' },
  { id: 'soundproofing', label: 'Soundproofing' },
  { id: 'outdoor_seating', label: 'Outdoor Seating' },
] as const;

export type AmenityId = (typeof AMENITIES)[number]['id'];
