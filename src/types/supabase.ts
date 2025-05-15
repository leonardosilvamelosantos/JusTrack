export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lawyers: {
        Row: {
          id: string
          oab_number: string
          name: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          oab_number: string
          name: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          oab_number?: string
          name?: string
          email?: string
          created_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          lawyer_id: string
          name: string
          whatsapp: string
          created_at: string
        }
        Insert: {
          id?: string
          lawyer_id: string
          name: string
          whatsapp: string
          created_at?: string
        }
        Update: {
          id?: string
          lawyer_id?: string
          name?: string
          whatsapp?: string
          created_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          lawyer_id: string
          client_id: string
          case_number: string
          court: string
          subject: string
          description: string | null
          status: 'pending' | 'inProgress' | 'urgent' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lawyer_id: string
          client_id: string
          case_number: string
          court: string
          subject: string
          description?: string | null
          status?: 'pending' | 'inProgress' | 'urgent' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lawyer_id?: string
          client_id?: string
          case_number?: string
          court?: string
          subject?: string
          description?: string | null
          status?: 'pending' | 'inProgress' | 'urgent' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      case_status: 'pending' | 'inProgress' | 'urgent' | 'completed'
    }
  }
}