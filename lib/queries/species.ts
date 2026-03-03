import { createClient } from '@/lib/supabase/server'
import type { Species } from '@/types'

export async function getSpecies(): Promise<Species[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('species')
    .select('*')
    .order('common_name')
  if (error) { console.error('getSpecies:', error); return [] }
  return data as Species[]
}
