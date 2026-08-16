import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const myApiKey = import.meta.env.VITE_API_KEY;

export const myDatabase = createClient(supabaseUrl, myApiKey);