import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'
import { getMajorMeta } from '@/lib/constants/major-meta'
import { getCareerMeta } from '@/lib/constants/career-meta'
import { RekomendasiJurusanSection } from '@/components/sections'

export default async function RekomendasiJurusanPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessment = await prisma.assessment.findFirst({
    where: { user_id: user.id, status: 'COMPLETED' }, orderBy: { createdAt: 'desc' },
    include: { analysis: true }
  })
  if (!assessment || !assessment.analysis) redirect('/test')

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true }
  })
  const userName = dbUser?.name || 'Siswa'

  const riasecScores = assessment.analysis.riasec_scores as Record<string, number>
  const datScores = assessment.analysis.dat_scores as Record<string, number>

  const sortedTraits = Object.entries(riasecScores).sort((a, b) => b[1] - a[1])
  const riasecCode = sortedTraits.slice(0, 3).map(t => t[0]).join('')
  const topLetter = sortedTraits[0][0]
  const totalScore = sortedTraits.reduce((s, [, v]) => s + v, 0)
  const suggestedField = (datScores['Numerical'] ?? 0) > (datScores['Verbal'] ?? 0) ? 'Saintek' : 'Soshum'

  const recommendation = getRiasecRecommendation(riasecCode)
  const majors = recommendation.majors.split(',').map(m => m.trim()).filter(Boolean)
  const careers = recommendation.careers.split(',').map(c => c.trim()).filter(Boolean)

  const baseScore = riasecScores[topLetter] ?? 0
  const basePercent = Math.min(95, Math.round(55 + (baseScore / totalScore) * 100 * 1.4))
  const majorsWithMatch = majors.map((major, idx) => ({
    major,
    meta: getMajorMeta(major),
    matchPercent: Math.max(52, basePercent - idx * Math.ceil((basePercent - 52) / Math.max(majors.length - 1, 1)))
  }))

  const topMajor = majorsWithMatch[0]
  const otherMajors = majorsWithMatch.slice(1)
  const previewCareers = careers.slice(0, 4)

  return (
    <RekomendasiJurusanSection
      userName={userName}
      riasecCode={riasecCode}
      suggestedField={suggestedField}
      totalMajors={majors.length}
      topMajor={topMajor}
      otherMajors={otherMajors}
      previewCareers={previewCareers}
      sortedTraits={sortedTraits as [string, number][]}
      totalScore={totalScore}
    />
  )
}
