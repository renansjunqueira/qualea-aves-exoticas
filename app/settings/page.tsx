import { redirect }        from 'next/navigation'
import { createClient }    from '@/lib/supabase/server'
import { getProfile }      from '@/lib/queries/users'
import { Header }          from '@/components/layout/Header'
import { ProfileForm }     from '@/components/settings/ProfileForm'

export const metadata = { title: 'Configurações' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfile(user.id)

  return (
    <div className="flex flex-col flex-1">
      <Header title="Configurações" />
      <main className="flex-1 p-4 lg:p-6 max-w-2xl animate-fade-in">
        <ProfileForm profile={profile} />
      </main>
    </div>
  )
}
