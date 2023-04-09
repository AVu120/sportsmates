import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyzcompany.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key"
);
