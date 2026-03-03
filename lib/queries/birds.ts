import { createClient } from '@/lib/supabase/server'
import type { Bird } from '@/types'

const BIRD_SELECT = `
  *,
  species:species_id (*),
  father:father_id (id, ring_number, species:species_id(common_name, emoji)),
  mother:mother_id (id, ring_number, species:species_id(common_name, emoji))
`

export async function getBirds(): Promise<Bird[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('birds')
    .select(BIRD_SELECT)
    .order('created_at', { ascending: false })
  if (error) { console.error('getBirds:', error); return [] }
  return data as Bird[]
}

export async function getBirdById(id: string): Promise<Bird | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('birds')
    .select(BIRD_SELECT)
    .eq('id', id)
    .single()
  if (error) { console.error('getBirdById:', error); return null }
  return data as Bird
}

export async function createBird(bird: Omit<Bird, 'id' | 'created_at' | 'updated_at' | 'species' | 'father' | 'mother'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('birds')
    .insert(bird)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateBird(id: string, bird: Partial<Bird>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('birds')
    .update(bird)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteBird(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('birds').delete().eq('id', id)
  if (error) throw error
}
