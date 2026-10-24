import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'placeholder-key';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn('⚠️ WARNING: SUPABASE_URL or SUPABASE_KEY is missing from Environment Variables! Database features will not connect until real keys are provided.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

if (process.env.SUPABASE_URL) {
  console.log('✅ Supabase client initialized');
}

export default supabase;
