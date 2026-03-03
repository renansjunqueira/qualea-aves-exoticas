// ── Espécies ──────────────────────────────────────────────
export interface Species {
  id: string
  common_name: string
  sci_name: string | null
  emoji: string
  created_at: string
}

// ── Aves ──────────────────────────────────────────────────
export type BirdSex    = 'M' | 'F' | 'U'
export type BirdStatus = 'plantel' | 'filhote' | 'vendido' | 'obito'

export interface Bird {
  id: string
  ring_number: string
  species_id: string
  mutation: string | null
  sex: BirdSex
  birth_date: string | null
  status: BirdStatus
  father_id: string | null
  mother_id: string | null
  notes: string | null
  photo_url: string | null
  created_at: string
  updated_at: string
  // Joined
  species?: Species
  father?: Bird | null
  mother?: Bird | null
}

// ── Casais ────────────────────────────────────────────────
export interface Pair {
  id: string
  male_id: string
  female_id: string
  aviary_number: string | null
  formed_at: string | null
  notes: string | null
  active: boolean
  created_at: string
  // Joined
  male?: Bird
  female?: Bird
  clutches?: Clutch[]
}

// ── Ninhadas ──────────────────────────────────────────────
export type ClutchStatus = 'incubating' | 'hatched' | 'lost' | 'weaning'

export interface Clutch {
  id: string
  pair_id: string
  first_egg_date: string | null
  total_eggs: number
  hatched: number
  infertile: number
  status: ClutchStatus
  notes: string | null
  created_at: string
  // Joined
  pair?: Pair
}

// ── Histórico de Saúde ────────────────────────────────────
export interface HealthRecord {
  id: string
  bird_id: string
  event_date: string
  type: string
  description: string | null
  vet_name: string | null
  created_at: string
}

// ── Dashboard ─────────────────────────────────────────────
export interface DashboardStats {
  totalBirds: number
  activePairs: number
  activeClutches: number
  chicksSeason: number
  speciesCount: number
}
