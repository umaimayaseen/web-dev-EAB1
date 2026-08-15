import { createClient } from "@supabase/supabase-js";

const supasbaseUrl =  import.meta.env.SUPABASE_URL;
const myApiKey = import.meta.env.SUPABASE_APIKEY

export const myDatabase = createClient(supabaseUrl, myApiKey);