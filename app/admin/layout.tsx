import { redirect }     from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProfile }   from '@/lib/queries/users'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfile(user.id)
  if (profile?.role !== 'admin') redirect('/')

  return <>{children}</>
}
