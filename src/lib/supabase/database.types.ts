export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      calendar_items: {
        Row: {
          arn: string | null
          client_id: string | null
          created_at: string
          done_at: string | null
          done_by: string | null
          due_date: string
          due_date_change_id: string | null
          filed_at: string | null
          filed_by: string | null
          filing_code: string | null
          firm_id: string
          id: string
          kind: string
          licence_id: string | null
          official_due_date: string
          period_label: string | null
          period_start: string | null
          receipt_file_id: string | null
          title: string | null
        }
        Insert: {
          arn?: string | null
          client_id?: string | null
          created_at?: string
          done_at?: string | null
          done_by?: string | null
          due_date: string
          due_date_change_id?: string | null
          filed_at?: string | null
          filed_by?: string | null
          filing_code?: string | null
          firm_id: string
          id?: string
          kind: string
          licence_id?: string | null
          official_due_date: string
          period_label?: string | null
          period_start?: string | null
          receipt_file_id?: string | null
          title?: string | null
        }
        Update: {
          arn?: string | null
          client_id?: string | null
          created_at?: string
          done_at?: string | null
          done_by?: string | null
          due_date?: string
          due_date_change_id?: string | null
          filed_at?: string | null
          filed_by?: string | null
          filing_code?: string | null
          firm_id?: string
          id?: string
          kind?: string
          licence_id?: string | null
          official_due_date?: string
          period_label?: string | null
          period_start?: string | null
          receipt_file_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_items_client_id_firm_id_fkey"
            columns: ["client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id", "firm_id"]
          },
          {
            foreignKeyName: "calendar_items_due_date_change_id_firm_id_fkey"
            columns: ["due_date_change_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "due_date_changes"
            referencedColumns: ["id", "firm_id"]
          },
          {
            foreignKeyName: "calendar_items_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_items_licence_id_client_id_firm_id_fkey"
            columns: ["licence_id", "client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "licences"
            referencedColumns: ["id", "client_id", "firm_id"]
          },
          {
            foreignKeyName: "calendar_items_receipt_file_id_id_firm_id_fkey"
            columns: ["receipt_file_id", "id", "firm_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id", "calendar_item_id", "firm_id"]
          },
        ]
      }
      client_filings: {
        Row: {
          client_id: string
          created_at: string
          filing_code: string
          firm_id: string
          id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          filing_code: string
          firm_id: string
          id?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          filing_code?: string
          firm_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_filings_client_id_firm_id_fkey"
            columns: ["client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id", "firm_id"]
          },
        ]
      }
      clients: {
        Row: {
          archived_at: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          firm_id: string
          gst_scheme: string
          gstin: string | null
          id: string
          name: string
          pan: string | null
          state: string
          trade_name: string | null
        }
        Insert: {
          archived_at?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          firm_id: string
          gst_scheme: string
          gstin?: string | null
          id?: string
          name: string
          pan?: string | null
          state: string
          trade_name?: string | null
        }
        Update: {
          archived_at?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          firm_id?: string
          gst_scheme?: string
          gstin?: string | null
          id?: string
          name?: string
          pan?: string | null
          state?: string
          trade_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          accepted_at: string
          firm_id: string
          id: string
          notice_version: string
          user_id: string
        }
        Insert: {
          accepted_at?: string
          firm_id: string
          id?: string
          notice_version: string
          user_id: string
        }
        Update: {
          accepted_at?: string
          firm_id?: string
          id?: string
          notice_version?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consents_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      due_date_changes: {
        Row: {
          created_at: string
          created_by: string
          filing_code: string
          firm_id: string
          id: string
          new_due_date: string
          period_start: string
          removed_at: string | null
          removed_by: string | null
          source: string
          state: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          filing_code: string
          firm_id: string
          id?: string
          new_due_date: string
          period_start: string
          removed_at?: string | null
          removed_by?: string | null
          source: string
          state?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          filing_code?: string
          firm_id?: string
          id?: string
          new_due_date?: string
          period_start?: string
          removed_at?: string | null
          removed_by?: string | null
          source?: string
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "due_date_changes_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          calendar_item_id: string | null
          client_id: string
          created_at: string
          deleted_at: string | null
          file_name: string
          firm_id: string
          id: string
          licence_id: string | null
          mime_type: string
          size_bytes: number
          storage_path: string
          uploaded_by: string
        }
        Insert: {
          calendar_item_id?: string | null
          client_id: string
          created_at?: string
          deleted_at?: string | null
          file_name: string
          firm_id: string
          id?: string
          licence_id?: string | null
          mime_type: string
          size_bytes: number
          storage_path: string
          uploaded_by: string
        }
        Update: {
          calendar_item_id?: string | null
          client_id?: string
          created_at?: string
          deleted_at?: string | null
          file_name?: string
          firm_id?: string
          id?: string
          licence_id?: string | null
          mime_type?: string
          size_bytes?: number
          storage_path?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_calendar_item_id_client_id_firm_id_fkey"
            columns: ["calendar_item_id", "client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "calendar_items"
            referencedColumns: ["id", "client_id", "firm_id"]
          },
          {
            foreignKeyName: "files_client_id_firm_id_fkey"
            columns: ["client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id", "firm_id"]
          },
          {
            foreignKeyName: "files_licence_id_client_id_firm_id_fkey"
            columns: ["licence_id", "client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "licences"
            referencedColumns: ["id", "client_id", "firm_id"]
          },
        ]
      }
      firms: {
        Row: {
          city: string | null
          contact_email: string | null
          created_at: string
          default_state: string | null
          id: string
          mobile: string | null
          name: string
        }
        Insert: {
          city?: string | null
          contact_email?: string | null
          created_at?: string
          default_state?: string | null
          id?: string
          mobile?: string | null
          name: string
        }
        Update: {
          city?: string | null
          contact_email?: string | null
          created_at?: string
          default_state?: string | null
          id?: string
          mobile?: string | null
          name?: string
        }
        Relationships: []
      }
      invites: {
        Row: {
          accepted_at: string | null
          client_id: string | null
          created_at: string
          email: string
          firm_id: string
          id: string
          invited_by: string
          role: string
        }
        Insert: {
          accepted_at?: string | null
          client_id?: string | null
          created_at?: string
          email: string
          firm_id: string
          id?: string
          invited_by: string
          role: string
        }
        Update: {
          accepted_at?: string | null
          client_id?: string | null
          created_at?: string
          email?: string
          firm_id?: string
          id?: string
          invited_by?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_client_id_firm_id_fkey"
            columns: ["client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id", "firm_id"]
          },
          {
            foreignKeyName: "invites_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      licences: {
        Row: {
          apply_by_date: string | null
          certificate_file_id: string | null
          client_id: string
          confirmed_at: string | null
          created_at: string
          expires_on: string | null
          firm_id: string
          id: string
          issued_on: string | null
          licence_type: string
          no_expiry: boolean
          number: string | null
          office: string | null
          source: string
        }
        Insert: {
          apply_by_date?: string | null
          certificate_file_id?: string | null
          client_id: string
          confirmed_at?: string | null
          created_at?: string
          expires_on?: string | null
          firm_id: string
          id?: string
          issued_on?: string | null
          licence_type: string
          no_expiry?: boolean
          number?: string | null
          office?: string | null
          source: string
        }
        Update: {
          apply_by_date?: string | null
          certificate_file_id?: string | null
          client_id?: string
          confirmed_at?: string | null
          created_at?: string
          expires_on?: string | null
          firm_id?: string
          id?: string
          issued_on?: string | null
          licence_type?: string
          no_expiry?: boolean
          number?: string | null
          office?: string | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "licences_certificate_file_id_id_firm_id_fkey"
            columns: ["certificate_file_id", "id", "firm_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id", "licence_id", "firm_id"]
          },
          {
            foreignKeyName: "licences_client_id_firm_id_fkey"
            columns: ["client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id", "firm_id"]
          },
        ]
      }
      members: {
        Row: {
          client_id: string | null
          created_at: string
          email: string
          firm_id: string
          name: string | null
          role: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          email: string
          firm_id: string
          name?: string | null
          role: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          email?: string
          firm_id?: string
          name?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_client_id_firm_id_fkey"
            columns: ["client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id", "firm_id"]
          },
          {
            foreignKeyName: "members_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      owner_tasks: {
        Row: {
          calendar_item_id: string
          client_id: string
          created_at: string
          created_by: string
          done_at: string | null
          done_by: string | null
          firm_id: string
          id: string
          note: string | null
          title: string
        }
        Insert: {
          calendar_item_id: string
          client_id: string
          created_at?: string
          created_by: string
          done_at?: string | null
          done_by?: string | null
          firm_id: string
          id?: string
          note?: string | null
          title: string
        }
        Update: {
          calendar_item_id?: string
          client_id?: string
          created_at?: string
          created_by?: string
          done_at?: string | null
          done_by?: string | null
          firm_id?: string
          id?: string
          note?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "owner_tasks_calendar_item_id_client_id_firm_id_fkey"
            columns: ["calendar_item_id", "client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "calendar_items"
            referencedColumns: ["id", "client_id", "firm_id"]
          },
        ]
      }
      thread_entries: {
        Row: {
          author_id: string | null
          body: string | null
          calendar_item_id: string
          client_id: string | null
          created_at: string
          event_type: string | null
          file_id: string | null
          firm_id: string
          id: string
          kind: string
          tag: string | null
        }
        Insert: {
          author_id?: string | null
          body?: string | null
          calendar_item_id: string
          client_id?: string | null
          created_at?: string
          event_type?: string | null
          file_id?: string | null
          firm_id: string
          id?: string
          kind: string
          tag?: string | null
        }
        Update: {
          author_id?: string | null
          body?: string | null
          calendar_item_id?: string
          client_id?: string | null
          created_at?: string
          event_type?: string | null
          file_id?: string | null
          firm_id?: string
          id?: string
          kind?: string
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thread_entries_calendar_item_id_client_id_firm_id_fkey"
            columns: ["calendar_item_id", "client_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "calendar_items"
            referencedColumns: ["id", "client_id", "firm_id"]
          },
          {
            foreignKeyName: "thread_entries_file_id_firm_id_fkey"
            columns: ["file_id", "firm_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id", "firm_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
