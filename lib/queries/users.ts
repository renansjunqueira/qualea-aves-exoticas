import { createAdminClient } from '@/lib/supabase/admin'
import type { Profile } from '@/types'

export async function getUsers(): Promise<Profile[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('getUsers:', error.message, error.code)
    return []
  }
  return data as Profile[]
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data as Profile
}
