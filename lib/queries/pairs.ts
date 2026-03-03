import { createClient } from '@/lib/supabase/server'
import type { Pair } from '@/types'

const PAIR_SELECT = `
  *,
  male:male_id   (*, species:species_id (*)),
  female:female_id (*, species:species_id (*))
`

export async function getPairs(): Promise<Pair[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pairs')
    .select(PAIR_SELECT)
    .eq('active', true)
    .order('created_at', { ascending: false })
  if (error) { console.error('getPairs:', error.message, error.code); return [] }
  return data as Pair[]
}

export async function getPairById(id: string): Promise<Pair | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pairs')
    .select(PAIR_SELECT)
    .eq('id', id)
    .single()
  if (error) { console.error('getPairById:', error.message, error.code); return null }
  return data as Pair
}

export async function createPair(pair: Omit<Pair, 'id' | 'created_at' | 'male' | 'female' | 'clutches'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pairs')
    .insert(pair)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updatePair(id: string, pair: Partial<Pair>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pairs')
    .update(pair)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}
