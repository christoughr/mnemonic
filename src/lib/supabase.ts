import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './config';

let supabase: SupabaseClient | null = null;
let supabaseAdmin: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabase) {
    supabase = createClient(
      config.supabase.url,
      config.supabase.anonKey
    );
  }
  return supabase;
}

export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      config.supabase.url,
      config.supabase.serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return supabaseAdmin;
}

// Database types
export interface KnowledgeItem {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    source: 'slack' | 'notion';
    author: string;
    author_id?: string;
    url: string;
    timestamp: string;
    channel?: string;
    workspace?: string;
    title?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface SearchResult extends KnowledgeItem {
  similarity: number;
}
