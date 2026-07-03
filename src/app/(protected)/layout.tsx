import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const [dbUser, assessment] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.assessment.findFirst({
      where: { user_id: user.id, status: 'COMPLETED' },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return (
    // ⚠️ JANGAN taruh overflow-x-hidden di sini (di wrapper flex ini).
    // overflow-x-hidden di parent akan mematikan `position: sticky`
    // pada Sidebar (browser menganggap parent ini scroll container,
    // walau cuma overflow-x yang di-set). Proteksi horizontal-scroll
    // cukup di <main> saja, tidak akan lolos ke luar wrapper ini.
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        userName={dbUser?.name}
        userSchool={dbUser?.school}
        hasCompletedTest={!!assessment}
      />

      {/* Main Content */}
      {/*
        pt-16 di mobile WAJIB ada karena header mobile di Sidebar
        bersifat `fixed` (lepas dari flex flow). Tanpa padding ini,
        konten (termasuk Navbar bila dipakai di halaman) akan
        "nempel"/tertutup di bawah header mobile.
        Di desktop (lg+) tidak perlu karena Sidebar sudah sticky/in-flow.
      */}
      <main className="flex-1 min-w-0 w-full overflow-x-hidden pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  )
}