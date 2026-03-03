'use server'
import { createClient }      from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath }    from 'next/cache'

interface ProfileUpdatePayload {
  name?:      string
  cpf?:       string
  phone?:     string
  address?:   string
  city?:      string
  state?:     string
  how_found?: string
}

export async function updateProfile(data: ProfileUpdatePayload): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  const admin = createAdminClient()
  const { error } = await admin
    .from('profiles')
    .update({
      name:      data.name      ?? null,
      cpf:       data.cpf       ?? null,
      phone:     data.phone     ?? null,
      address:   data.address   ?? null,
      city:      data.city      ?? null,
      state:     data.state     ?? null,
      how_found: data.how_found ?? null,
    })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/settings')
  return {}
}

export async function updatePassword(newPassword: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: error.message }
  return {}
}
