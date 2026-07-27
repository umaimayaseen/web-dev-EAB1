import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://cntwuzhsaskcjlgcicss.supabase.co'
const myApiKey = 'sb_publishable_xFuDrcAHrQCT9czVQznvAw_Phk7heqF'

export const myDatabase = createClient(myApiKey, supabaseURL);