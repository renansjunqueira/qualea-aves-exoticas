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
  const { data, error } = await supabase
    .from('clutches')
    .select(CLUTCH_SELECT)
    .order('created_at', { ascending: false })
  if (error) { console.error('getClutches:', error); return [] }
  return data as Clutch[]
}

export async function getClutchById(id: string): Promise<Clutch | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clutches')
    .select(CLUTCH_SELECT)
    .eq('id', id)
    .single()
  if (error) { console.error('getClutchById:', error); return null }
  return data as Clutch
}

export async function getClutchesByPair(pairId: string): Promise<Clutch[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clutches')
    .select(CLUTCH_SELECT)
    .eq('pair_id', pairId)
    .order('first_egg_date', { ascending: false })
  if (error) { console.error('getClutchesByPair:', error); return [] }
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
  const [birdsRes, pairsRes, clutchesRes] = await Promise.all([
    supabase.from('birds').select('id, status, sex', { count: 'exact' }),
    supabase.from('pairs').select('id', { count: 'exact' }).eq('active', true),
    supabase.from('clutches').select('id, status, hatched', { count: 'exact' }),
  ])

  const birds    = birdsRes.data    ?? []
  const pairs    = pairsRes.data    ?? []
  const clutches = clutchesRes.data ?? []

  const currentYear = new Date().getFullYear()

  return {
    totalBirds:     birdsRes.count    ?? 0,
    activePairs:    pairsRes.count    ?? 0,
    activeClutches: clutches.filter(c => c.status === 'incubating' || c.status === 'weaning').length,
    chicksSeason:   clutches.reduce((s: number, c: any) => s + (c.hatched ?? 0), 0),
    speciesCount:   0, // buscado separado
  }
}
