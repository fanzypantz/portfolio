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
      chat_messages: {
        Row: {
          created_at: string
          id: number
          lobby_id: number | null
          message: string | null
          profile_id: string | null
          uuid: string
        }
        Insert: {
          created_at?: string
          id?: number
          lobby_id?: number | null
          message?: string | null
          profile_id?: string | null
          uuid?: string
        }
        Update: {
          created_at?: string
          id?: number
          lobby_id?: number | null
          message?: string | null
          profile_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_lobby_id_fkey"
            columns: ["lobby_id"]
            isOneToOne: false
            referencedRelation: "lobbies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          created_at: string
          end_time: string | null
          id: number
          lobby_id: number | null
          owner_id: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["GameStatus"] | null
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          id?: number
          lobby_id?: number | null
          owner_id?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["GameStatus"] | null
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string | null
          id?: number
          lobby_id?: number | null
          owner_id?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["GameStatus"] | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_lobby_id_fkey"
            columns: ["lobby_id"]
            isOneToOne: false
            referencedRelation: "lobbies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      lobbies: {
        Row: {
          created_at: string
          id: number
          name: string | null
          password: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          password?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          password?: string | null
        }
        Relationships: []
      }
      piece_moves: {
        Row: {
          created_at: string
          end_coordinate_x: number | null
          end_coordinate_y: number | null
          id: number
          piece_id: number | null
          profile_id: string | null
          start_coordinate_x: number | null
          start_coordinate_y: number | null
        }
        Insert: {
          created_at?: string
          end_coordinate_x?: number | null
          end_coordinate_y?: number | null
          id?: number
          piece_id?: number | null
          profile_id?: string | null
          start_coordinate_x?: number | null
          start_coordinate_y?: number | null
        }
        Update: {
          created_at?: string
          end_coordinate_x?: number | null
          end_coordinate_y?: number | null
          id?: number
          piece_id?: number | null
          profile_id?: string | null
          start_coordinate_x?: number | null
          start_coordinate_y?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "piece_moves_piece_id_fkey"
            columns: ["piece_id"]
            isOneToOne: false
            referencedRelation: "pieces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "piece_moves_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      pieces: {
        Row: {
          color: string | null
          created_at: string
          game_id: number | null
          id: number
          type: string | null
          x_coordinate: number | null
          y_coordinate: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          game_id?: number | null
          id?: number
          type?: string | null
          x_coordinate?: number | null
          y_coordinate?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          game_id?: number | null
          id?: number
          type?: string | null
          x_coordinate?: number | null
          y_coordinate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pieces_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          username: string | null
        }
        Insert: {
          id: string
          username?: string | null
        }
        Update: {
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      score: {
        Row: {
          created_at: string
          game_id: number | null
          id: number
          profile_id: string | null
          score: number | null
        }
        Insert: {
          created_at?: string
          game_id?: number | null
          id?: number
          profile_id?: string | null
          score?: number | null
        }
        Update: {
          created_at?: string
          game_id?: number | null
          id?: number
          profile_id?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "score_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "score_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      GameStatus: "Open" | "Closed" | "Ongoing" | "Finished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
