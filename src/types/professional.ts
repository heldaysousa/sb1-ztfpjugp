export interface Professional {
  id: string;
  owner_id: string;
  name: string;
  email?: string;
  phone?: string;
  document_number?: string;
  base_commission_rate: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalService {
  professional_id: string;
  service_id: string;
  commission_rate?: number;
}

export interface Commission {
  id: string;
  professional_id: string;
  appointment_id: string;
  amount: number;
  rate: number;
  status: 'pending' | 'paid' | 'cancelled';
  payment_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalFormData {
  name: string;
  email?: string;
  phone?: string;
  document_number?: string;
  base_commission_rate: number;
  services: Array<{
    service_id: string;
    commission_rate?: number;
  }>;
}