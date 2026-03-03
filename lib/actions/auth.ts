'use server'
import { createClient }      from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect }          from 'next/navigation'

export async function signIn(email: string, password: string): Promise<{ error: string }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  redirect('/dashboard')
}

interface SignupProfile {
  name:       string
  cpf:        string
  phone:      string
  address?:   string
  city?:      string
  state?:     string
  how_found?: string
}

export async function signUp(
  email: string,
  password: string,
  profile: SignupProfile,
): Promise<{ error: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return { error: error.message }

  // Atualiza o profile criado pelo trigger com os dados extras
  if (data.user) {
    const admin = createAdminClient()
    await admin.from('profiles').update({
      name:      profile.name,
      cpf:       profile.cpf,
      phone:     profile.phone,
      address:   profile.address   || null,
      city:      profile.city      || null,
      state:     profile.state     || null,
      how_found: profile.how_found || null,
    }).eq('id', data.user.id)
  }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
