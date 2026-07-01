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
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const [dbUser, assessment] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.assessment.findFirst({
      where: { user_id: user.id, status: 'COMPLETED' }, orderBy: { createdAt: 'desc' }
    })
  ])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userName={dbUser?.name}
        userSchool={dbUser?.school}
        hasCompletedTest={!!assessment}
      />
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {children}
      </main>
    </div>
  )
}
