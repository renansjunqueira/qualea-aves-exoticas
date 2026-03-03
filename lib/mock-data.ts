// Mock data para desenvolvimento — substituir por queries Supabase reais
import type { Bird, Pair, Clutch, Species, DashboardStats } from '@/types'

export const MOCK_SPECIES: Species[] = [
  { id: 's1', common_name: 'Ring Neck', sci_name: 'Psittacula krameri', emoji: '🟢', created_at: '' },
  { id: 's2', common_name: 'Lori Molucano', sci_name: 'Eos bornea', emoji: '🔴', created_at: '' },
  { id: 's3', common_name: 'Cabeça-de-Ameixa', sci_name: 'Psittacula cyanocephala', emoji: '🟣', created_at: '' },
  { id: 's4', common_name: 'Grande Alexandre', sci_name: 'Psittacula eupatria', emoji: '💚', created_at: '' },
  { id: 's5', common_name: 'Red Rumped', sci_name: 'Psephotus haematonotus', emoji: '🟤', created_at: '' },
]

export const MOCK_BIRDS: Bird[] = [
  { id: 'b1', ring_number: 'QAE-2024-001', species_id: 's1', mutation: 'Lutino', sex: 'M', birth_date: '2024-02-10', status: 'plantel', father_id: null, mother_id: null, notes: 'Reprodutor principal', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[0] },
  { id: 'b2', ring_number: 'QAE-2024-002', species_id: 's1', mutation: 'Albino', sex: 'F', birth_date: '2024-03-05', status: 'plantel', father_id: null, mother_id: null, notes: '', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[0] },
  { id: 'b3', ring_number: 'QAE-2023-010', species_id: 's2', mutation: 'Vermelho Normal', sex: 'M', birth_date: '2023-07-18', status: 'plantel', father_id: null, mother_id: null, notes: 'Importado', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[1] },
  { id: 'b4', ring_number: 'QAE-2023-011', species_id: 's2', mutation: 'Vermelho Normal', sex: 'F', birth_date: '2023-08-22', status: 'plantel', father_id: null, mother_id: null, notes: '', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[1] },
  { id: 'b5', ring_number: 'QAE-2025-001', species_id: 's3', mutation: 'Normal', sex: 'U', birth_date: '2025-01-14', status: 'filhote', father_id: null, mother_id: null, notes: 'Aguardando sexagem por DNA', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[2] },
  { id: 'b6', ring_number: 'QAE-2022-030', species_id: 's4', mutation: 'Verde Normal', sex: 'M', birth_date: '2022-05-20', status: 'plantel', father_id: null, mother_id: null, notes: '', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[3] },
  { id: 'b7', ring_number: 'QAE-2022-031', species_id: 's4', mutation: 'Verde Normal', sex: 'F', birth_date: '2022-06-10', status: 'plantel', father_id: null, mother_id: null, notes: '', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[3] },
  { id: 'b8', ring_number: 'QAE-2023-045', species_id: 's5', mutation: 'Normal', sex: 'M', birth_date: '2023-11-03', status: 'plantel', father_id: null, mother_id: null, notes: '', photo_url: null, created_at: '', updated_at: '', species: MOCK_SPECIES[4] },
]

export const MOCK_PAIRS: Pair[] = [
  { id: 'p1', male_id: 'b1', female_id: 'b2', aviary_number: 'V-01', formed_at: '2024-09-01', notes: 'Casal principal Ring Necks', active: true, created_at: '', male: MOCK_BIRDS[0], female: MOCK_BIRDS[1] },
  { id: 'p2', male_id: 'b3', female_id: 'b4', aviary_number: 'V-02', formed_at: '2024-10-15', notes: '', active: true, created_at: '', male: MOCK_BIRDS[2], female: MOCK_BIRDS[3] },
  { id: 'p3', male_id: 'b6', female_id: 'b7', aviary_number: 'V-05', formed_at: '2023-03-10', notes: 'Casal Grande Alexandre', active: true, created_at: '', male: MOCK_BIRDS[5], female: MOCK_BIRDS[6] },
]

export const MOCK_CLUTCHES: Clutch[] = [
  { id: 'c1', pair_id: 'p1', first_egg_date: '2025-02-10', total_eggs: 6, hatched: 4, infertile: 1, status: 'weaning', notes: 'Ótima ninhada', created_at: '', pair: MOCK_PAIRS[0] },
  { id: 'c2', pair_id: 'p2', first_egg_date: '2025-03-01', total_eggs: 4, hatched: 0, infertile: 0, status: 'incubating', notes: '', created_at: '', pair: MOCK_PAIRS[1] },
  { id: 'c3', pair_id: 'p3', first_egg_date: '2025-02-25', total_eggs: 3, hatched: 2, infertile: 0, status: 'hatched', notes: '', created_at: '', pair: MOCK_PAIRS[2] },
]

export const MOCK_STATS: DashboardStats = {
  totalBirds: 47,
  activePairs: 12,
  activeClutches: 5,
  chicksSeason: 18,
  speciesCount: 5,
}
