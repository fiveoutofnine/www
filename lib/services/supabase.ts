import type { Database } from '@/generated/database.types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Client-exposed Supabase client.
 */
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
