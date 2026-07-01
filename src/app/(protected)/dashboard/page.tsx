import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardSection } from '@/components/sections/DashboardSection'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [dbUser, assessment, totalQuestions] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.assessment.findFirst({
      where: { user_id: user.id },
      include: { analysis: true, answers: { select: { id: true } } },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.question.count()
  ])

  const isCompleted = assessment?.status === 'COMPLETED'
  
  let progressPercentage = 0
  if (isCompleted) {
    progressPercentage = 100
  } else if (assessment?.answers && totalQuestions > 0) {
    progressPercentage = Math.round((assessment.answers.length / totalQuestions) * 100)
  }

  const riasecScores = isCompleted && assessment?.analysis
    ? assessment.analysis.riasec_scores as Record<string, number>
    : null
  const riasecCode = riasecScores
    ? Object.entries(riasecScores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(t => t[0]).join('')
    : null

  return (
    <DashboardSection 
      userName={dbUser?.name || 'Siswa'} 
      isCompleted={isCompleted} 
      riasecCode={riasecCode} 
      riasecScores={riasecScores} 
      progressPercentage={progressPercentage}
    />
  )
}
