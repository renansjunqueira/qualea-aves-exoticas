import { createClient } from '@/lib/supabase/server'
import type { Clutch } from '@/types'

const CLUTCH_SELECT = `
  *,
  pair:pair_id (
    *,
    male:male_id   (*, species:species_id (*)),
    female:female_id (*, species:species_id (*))
  )
`

export async function getClutches(): Promise<Clutch[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('clutches')
    .select(CLUTCH_SELECT)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  if (error) { console.error('getClutches:', error.message, error.code); return [] }
  return data as Clutch[]
}

export async function getClutchById(id: string): Promise<Clutch | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase
    .from('clutches')
    .select(CLUTCH_SELECT)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()
  if (error) { console.error('getClutchById:', error.message, error.code); return null }
  return data as Clutch
}

export async function getClutchesByPair(pairId: string): Promise<Clutch[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('clutches')
    .select(CLUTCH_SELECT)
    .eq('pair_id', pairId)
    .eq('user_id', user.id)
    .order('first_egg_date', { ascending: false })
  if (error) { console.error('getClutchesByPair:', error.message, error.code); return [] }
  return data as Clutch[]
}

export async function createClutch(clutch: Omit<Clutch, 'id' | 'created_at' | 'pair'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clutches')
    .insert(clutch)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateClutch(id: string, clutch: Partial<Clutch>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clutches')
    .update(clutch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getDashboardStats() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { totalBirds: 0, activePairs: 0, activeClutches: 0, chicksSeason: 0, speciesCount: 0 }

  const [birdsRes, pairsRes, clutchesRes] = await Promise.all([
    supabase.from('birds').select('id, status, sex', { count: 'exact' }).eq('user_id', user.id),
    supabase.from('pairs').select('id', { count: 'exact' }).eq('user_id', user.id).eq('active', true),
    supabase.from('clutches').select('id, status, hatched', { count: 'exact' }).eq('user_id', user.id),
  ])

  const clutches = clutchesRes.data ?? []

  return {
    totalBirds:     birdsRes.count    ?? 0,
    activePairs:    pairsRes.count    ?? 0,
    activeClutches: clutches.filter(c => c.status === 'incubating' || c.status === 'weaning').length,
    chicksSeason:   clutches.reduce((s: number, c: any) => s + (c.hatched ?? 0), 0),
    speciesCount:   0,
  }
}
