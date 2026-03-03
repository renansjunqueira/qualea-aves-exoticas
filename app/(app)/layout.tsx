import { Sidebar }   from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { createClient } from '@/lib/supabase/server'
import { getProfile }   from '@/lib/queries/users'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const profile = user ? await getProfile(user.id) : null
  const isAdmin = profile?.role === 'admin'

  return (
    <>
      <Sidebar userEmail={user?.email} isAdmin={isAdmin} />
      <div className="lg:pl-60 min-h-screen flex flex-col">
        {children}
        <div className="h-16 lg:hidden flex-shrink-0" aria-hidden />
      </div>
      <BottomNav />
    </>
  )
}
