import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ CRITICAL: SUPABASE_URL or SUPABASE_KEY is missing from Environment Variables!');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

if (supabaseUrl) {
  console.log('✅ Supabase client initialized');
}

export default supabase;
