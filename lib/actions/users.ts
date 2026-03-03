'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient }      from '@/lib/supabase/server'
import { revalidatePath }    from 'next/cache'

async function assertAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  const admin = createAdminClient()
  const { data: profile } = await admin
    .from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') throw new Error('Sem permissão')
}

export async function approveUser(id: string) {
  await assertAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('profiles').update({ status: 'active' }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}

export async function suspendUser(id: string) {
  await assertAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('profiles').update({ status: 'suspended' }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}

export async function deleteUser(id: string) {
  await assertAdmin()
  // Deleta de auth.users → cascade apaga o profile automaticamente
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.deleteUser(id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}
