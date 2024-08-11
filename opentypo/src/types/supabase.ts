export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string | null
          font_id: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          font_id?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          font_id?: number | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_font_id_fkey"
            columns: ["font_id"]
            isOneToOne: false
            referencedRelation: "fonts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          email_address: string | null
          feedback: string | null
          id: number
          rating: number | null
          submit_time: string
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          email_address?: string | null
          feedback?: string | null
          id?: number
          rating?: number | null
          submit_time?: string
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          email_address?: string | null
          feedback?: string | null
          id?: number
          rating?: number | null
          submit_time?: string
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      font_personality: {
        Row: {
          font_id: number
          personality_id: number | null
        }
        Insert: {
          font_id?: number
          personality_id?: number | null
        }
        Update: {
          font_id?: number
          personality_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "font_personality_font_id_fkey"
            columns: ["font_id"]
            isOneToOne: false
            referencedRelation: "fonts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "font_personality_personality_id_fkey"
            columns: ["personality_id"]
            isOneToOne: false
            referencedRelation: "personality"
            referencedColumns: ["id"]
          },
        ]
      }
      fonts: {
        Row: {
          author: Json | null
          category_id: number | null
          download_url: string | null
          font_file_path: string | null
          id: number
          language_id: number | null
          license: string | null
          name: string | null
        }
        Insert: {
          author?: Json | null
          category_id?: number | null
          download_url?: string | null
          font_file_path?: string | null
          id?: number
          language_id?: number | null
          license?: string | null
          name?: string | null
        }
        Update: {
          author?: Json | null
          category_id?: number | null
          download_url?: string | null
          font_file_path?: string | null
          id?: number
          language_id?: number | null
          license?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fonts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fonts_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["id"]
          },
        ]
      }
      language: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      personality: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
