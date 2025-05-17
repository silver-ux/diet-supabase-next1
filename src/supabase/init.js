import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const api = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(url, api);

export default supabase