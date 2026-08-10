import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://zdtifjhxrjboqusvycik.supabase.co';
const myApiKey = 'sb_publishable_CW7xLA8JbfVtfXv-_NlK6w_4AIpgGMo';

export const myDatabase = createClient(supabaseUrl, myApiKey);