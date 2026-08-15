import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://bzvpobditufuyuougpgh.supabase.co';
const myApiKey = 'sb_publishable_j4FtUXc19AGEcolvl7iL8A_SCWBX1Gx';

export const myDatabase = createClient(supabaseUrl, myApiKey);