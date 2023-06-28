import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

/**
 * Client-exposed Supabase client.
 */
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-only Supabase client.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
