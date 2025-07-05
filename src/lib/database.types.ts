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
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          source_url: string
          site_type: 'dynamic' | 'static'
          status: 'created' | 'analyzing' | 'analyzed' | 'migrating' | 'validating' | 'completed' | 'failed'
          target_environment: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          source_url: string
          site_type: 'dynamic' | 'static'
          status?: 'created' | 'analyzing' | 'analyzed' | 'migrating' | 'validating' | 'completed' | 'failed'
          target_environment?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          source_url?: string
          site_type?: 'dynamic' | 'static'
          status?: 'created' | 'analyzing' | 'analyzed' | 'migrating' | 'validating' | 'completed' | 'failed'
          target_environment?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      analysis_results: {
        Row: {
          id: string
          project_id: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      migration_steps: {
        Row: {
          id: string
          project_id: string
          step_name: string
          step_order: number
          status: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
          progress: number
          start_time: string | null
          end_time: string | null
          logs: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          step_name: string
          step_order: number
          status?: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
          progress?: number
          start_time?: string | null
          end_time?: string | null
          logs?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          step_name?: string
          step_order?: number
          status?: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
          progress?: number
          start_time?: string | null
          end_time?: string | null
          logs?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      validation_results: {
        Row: {
          id: string
          project_id: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          company: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          company?: string | null
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
      [_ in never]: never
    }
  }
}