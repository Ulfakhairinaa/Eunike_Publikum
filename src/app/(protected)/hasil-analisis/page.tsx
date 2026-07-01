import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { HasilAnalisisSection } from '@/components/sections'
import { FUN_FACTS, type Field, type Difficulty } from '@/lib/constants/career-map'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'

export default async function HasilAnalisisPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessment = await prisma.assessment.findFirst({
    where: { user_id: user.id, status: 'COMPLETED' }, orderBy: { createdAt: 'desc' },
    include: { analysis: true }
  })

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })

  if (!assessment || !assessment.analysis) redirect('/test')

  const riasecScores = assessment.analysis.riasec_scores as Record<string, number>
  const datScores = assessment.analysis.dat_scores as Record<string, number>

  const sortedTraits = Object.entries(riasecScores).sort((a, b) => b[1] - a[1])
  const riasecCode = sortedTraits.slice(0, 3).map(t => t[0]).join('')

  const verbalScore = datScores['Verbal'] || 0
  const numericScore = datScores['Numerical'] || 0
  const klarikalScore = datScores['Clerical'] || 0
  const totalScore = verbalScore + numericScore + klarikalScore

  const suggestedField: Field = numericScore > verbalScore ? 'Saintek' : 'Soshum'
  let difficulty: Difficulty = 'Easy'
  if (totalScore >= 200) difficulty = 'Hard'
  else if (totalScore >= 100) difficulty = 'Medium'

  const funFact = FUN_FACTS[suggestedField][difficulty]
  const recommendation = getRiasecRecommendation(riasecCode)
  const majors = recommendation.majors.split(', ').slice(0, 3)

  return (
    <HasilAnalisisSection
      userName={dbUser?.name || 'Siswa'}
      riasecScores={riasecScores}
      datScores={datScores}
      riasecCode={riasecCode}
      suggestedField={suggestedField}
      funFact={funFact}
      majors={majors}
    />
  )
}
