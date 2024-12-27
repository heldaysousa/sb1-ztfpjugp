export interface Client {
  id: string;
  owner_id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  first_visit_date: string;
  birthday?: string;
  social_media?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  referral_source?: 'social_media' | 'referral' | 'neighborhood' | 'other';
  created_at: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  first_visit_date: string;
  birthday?: string;
  social_media?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  referral_source?: string;
}