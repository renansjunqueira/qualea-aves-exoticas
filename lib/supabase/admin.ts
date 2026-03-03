import { createClient } from '@supabase/supabase-js'

// Cliente com service role key — bypassa RLS.
// Usar APENAS em server actions / route handlers (nunca no cliente).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
