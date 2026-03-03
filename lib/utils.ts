import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function calcAge(birthDate: string | null | undefined): string {
  if (!birthDate) return ''
  const birth = new Date(birthDate)
  const now   = new Date()
  let years   = now.getFullYear() - birth.getFullYear()
  let months  = now.getMonth() - birth.getMonth()
  if (months < 0) { years--; months += 12 }
  if (years > 0) return `${years} ano${years > 1 ? 's' : ''}`
  if (months > 0) return `${months} mês${months !== 1 ? 'es' : ''}`
  const days = Math.floor((now.getTime() - birth.getTime()) / 86400000)
  return `${days} dia${days !== 1 ? 's' : ''}`
}

export const SEX_LABEL: Record<string, string> = {
  M: 'Macho', F: 'Fêmea', U: 'Indefinido',
}

export const STATUS_LABEL: Record<string, string> = {
  plantel: 'Plantel', filhote: 'Filhote', vendido: 'Vendido', obito: 'Óbito',
}

export const CLUTCH_STATUS_LABEL: Record<string, string> = {
  incubating: 'Incubando', hatched: 'Nascidos', lost: 'Perdida', weaning: 'Desmame',
}
