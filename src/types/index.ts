export interface Lawyer {
  id: string;
  name: string;
  email: string;
  oabNumber: string;
  oabState: string;
  address: string;
  whatsapp: string;
  professionalDocument: string;
  oabPhoto: string;
  howFound: string;
  createdAt: Date;
}

export interface Case {
  id: string;
  clientName: string;
  clientWhatsapp: string;
  caseNumber: string;
  court: string;
  subject: string;
  description: string;
  status: 'pending' | 'inProgress' | 'urgent' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  user: Lawyer | null;
}