import { createClient } from '@/lib/supabase/server'
import type { Bird } from '@/types'

// Listagem: sem self-join (evita ambiguidade de FK no PostgREST)
const BIRD_LIST_SELECT = `*, species:species_id (*)`

// Detalhe: inclui pai/mãe com hint explícito de FK para disambiguar
const BIRD_DETAIL_SELECT = `
  *,
  species:species_id (*),
  father:birds!birds_father_id_fkey (id, ring_number, species:species_id(common_name, emoji)),
  mother:birds!birds_mother_id_fkey (id, ring_number, species:species_id(common_name, emoji))
`

export async function getBirds(): Promise<Bird[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('birds')
    .select(BIRD_LIST_SELECT)
    .order('created_at', { ascending: false })
  if (error) { console.error('getBirds:', error.message, error.code); return [] }
  return data as Bird[]
}

export async function getBirdById(id: string): Promise<Bird | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('birds')
    .select(BIRD_DETAIL_SELECT)
    .eq('id', id)
    .single()
  if (error) { console.error('getBirdById:', error.message, error.code); return null }
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
