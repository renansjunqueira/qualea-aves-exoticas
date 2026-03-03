import { Header } from '@/components/layout/Header'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card'
import { Badge }  from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getUsers } from '@/lib/queries/users'
import { approveUser, suspendUser, deleteUser } from '@/lib/actions/users'
import { Users, CheckCircle, Clock, Ban, Trash2 } from 'lucide-react'
import type { Profile } from '@/types'

export const metadata = { title: 'Gestão de Usuários' }

function StatusBadge({ status }: { status: Profile['status'] }) {
  if (status === 'active')    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"><CheckCircle size={11} />Ativo</span>
  if (status === 'pending')   return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><Clock size={11} />Pendente</span>
  if (status === 'suspended') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"><Ban size={11} />Suspenso</span>
  return null
}

function RoleBadge({ role }: { role: Profile['role'] }) {
  if (role === 'admin') return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">Admin</span>
  return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Usuário</span>
}

export default async function UsersPage() {
  const users = await getUsers()

  const total    = users.length
  const active   = users.filter(u => u.status === 'active').length
  const pending  = users.filter(u => u.status === 'pending').length
  const suspended = users.filter(u => u.status === 'suspended').length

  return (
    <div className="flex flex-col flex-1">
      <Header title="Gestão de Usuários" />

      <main className="flex-1 p-4 lg:p-6 space-y-6 animate-fade-in">

        {/* Contadores */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total',     value: total,    icon: Users,       color: 'text-gray-700',   bg: 'bg-gray-100'   },
            { label: 'Ativos',    value: active,   icon: CheckCircle, color: 'text-green-700',  bg: 'bg-green-100'  },
            { label: 'Pendentes', value: pending,  icon: Clock,       color: 'text-amber-700',  bg: 'bg-amber-100'  },
            { label: 'Suspensos', value: suspended, icon: Ban,        color: 'text-red-700',    bg: 'bg-red-100'    },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <CardBody className="flex items-center gap-3 py-4">
                <div className={`w-9 h-9 rounded-[var(--radius-md)] ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-muted">{label}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader><CardTitle>Usuários cadastrados</CardTitle></CardHeader>
          <CardBody className="p-0">
            {users.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted">Nenhum usuário encontrado.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-50/50 border-b border-border">
                      <th className="text-left text-xs font-semibold text-muted px-5 py-3">E-mail</th>
                      <th className="text-left text-xs font-semibold text-muted px-3 py-3 hidden sm:table-cell">Perfil</th>
                      <th className="text-left text-xs font-semibold text-muted px-3 py-3">Status</th>
                      <th className="text-left text-xs font-semibold text-muted px-3 py-3 hidden md:table-cell">Cadastro</th>
                      <th className="text-right text-xs font-semibold text-muted px-5 py-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-border last:border-0 hover:bg-primary-50/20 transition-colors">
                        <td className="px-5 py-3 font-medium text-gray-800 truncate max-w-[180px]">
                          {user.email}
                        </td>
                        <td className="px-3 py-3 hidden sm:table-cell">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="px-3 py-3">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="px-3 py-3 text-muted hidden md:table-cell">
                          {new Date(user.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {user.status !== 'active' && user.role !== 'admin' && (
                              <form action={approveUser.bind(null, user.id)}>
                                <Button type="submit" size="sm" className="h-7 text-xs px-2">
                                  <CheckCircle size={12} /> Aprovar
                                </Button>
                              </form>
                            )}
                            {user.status === 'active' && user.role !== 'admin' && (
                              <form action={suspendUser.bind(null, user.id)}>
                                <Button type="submit" size="sm" variant="secondary" className="h-7 text-xs px-2">
                                  <Ban size={12} /> Suspender
                                </Button>
                              </form>
                            )}
                            {user.role !== 'admin' && (
                              <form action={deleteUser.bind(null, user.id)}>
                                <button
                                  type="submit"
                                  className="h-7 w-7 flex items-center justify-center rounded-[var(--radius-sm)] text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                                  title="Deletar usuário"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </form>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>

      </main>
    </div>
  )
}
