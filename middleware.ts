import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas acessíveis sem autenticação
const PUBLIC_ROUTES = ['/login', '/signup']
// Rotas acessíveis para qualquer usuário autenticado (independente do status)
const STATUS_ROUTES = ['/pending', '/suspended']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Verificar autenticação
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    if (PUBLIC_ROUTES.some(r => pathname.startsWith(r))) return response
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Usuário autenticado tentando acessar rota pública → home
  if (PUBLIC_ROUTES.some(r => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. Verificar status do perfil (RLS "read own" permite ao anon key)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', user.id)
    .single()

  const status = profile?.status
  const role   = profile?.role

  // Em /pending ou /suspended — não bloquear, mas redirecionar se já está ativo
  if (STATUS_ROUTES.some(r => pathname.startsWith(r))) {
    if (status === 'active') return NextResponse.redirect(new URL('/', request.url))
    return response
  }

  if (status === 'pending')   return NextResponse.redirect(new URL('/pending',   request.url))
  if (status === 'suspended') return NextResponse.redirect(new URL('/suspended', request.url))

  // 3. Rotas /admin → apenas admins
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|logo.jpg|icons).*)',
  ],
}
