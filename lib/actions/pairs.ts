'use server'
import { createClient } from '@/lib/supabase/server'

interface PairPayload {
  male_id:       string
  female_id:     string
  aviary_number?: string
  formed_at?:    string
  notes?:        string
}

export async function savePair(payload: PairPayload, id?: string) {
  const supabase = await createClient()
  const data = {
    male_id:       payload.male_id,
    female_id:     payload.female_id,
    aviary_number: payload.aviary_number || null,
    formed_at:     payload.formed_at     || null,
    notes:         payload.notes         || null,
    active:        true,
  }
  if (id) {
    const { error } = await supabase.from('pairs').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('pairs').insert(data)
    if (error) throw new Error(error.message)
  }
}
