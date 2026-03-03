'use server'
import { createClient } from '@/lib/supabase/server'
import type { BirdSex, BirdStatus } from '@/types'

interface BirdPayload {
  ring_number: string
  species_id:  string
  mutation?:   string
  sex:         BirdSex
  status:      BirdStatus
  birth_date?: string
  father_id?:  string
  mother_id?:  string
  notes?:      string
  photo_url?:  string | null
}

export async function saveBird(payload: BirdPayload, id?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const data = {
    ring_number: payload.ring_number,
    species_id:  payload.species_id,
    mutation:    payload.mutation   || null,
    sex:         payload.sex,
    status:      payload.status,
    birth_date:  payload.birth_date || null,
    father_id:   payload.father_id  || null,
    mother_id:   payload.mother_id  || null,
    notes:       payload.notes      || null,
    photo_url:   payload.photo_url  ?? null,
  }
  if (id) {
    const { error } = await supabase.from('birds').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('birds').insert(data)
    if (error) throw new Error(error.message)
  }
}
