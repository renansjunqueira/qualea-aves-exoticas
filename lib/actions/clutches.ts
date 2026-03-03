'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { ClutchStatus } from '@/types'

interface ClutchPayload {
  pair_id:        string
  first_egg_date?: string
  total_eggs:     number
  hatched:        number
  infertile:      number
  status:         ClutchStatus
  notes?:         string
}

export async function saveClutch(payload: ClutchPayload, id?: string) {
  const supabase = createAdminClient()
  const data = {
    pair_id:        payload.pair_id,
    first_egg_date: payload.first_egg_date || null,
    total_eggs:     payload.total_eggs,
    hatched:        payload.hatched,
    infertile:      payload.infertile,
    status:         payload.status,
    notes:          payload.notes || null,
  }
  if (id) {
    const { error } = await supabase.from('clutches').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('clutches').insert(data)
    if (error) throw new Error(error.message)
  }
}
