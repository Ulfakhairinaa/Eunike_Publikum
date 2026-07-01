import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'
import { getMajorMeta } from '@/lib/constants/major-meta'
import { getCareerMeta } from '@/lib/constants/career-meta'
import { ProspekKarierSection } from '@/components/sections/ProspekKarierSection'

const RIASEC_COLORS: Record<string, { bg: string; text: string; border: string; soft: string }> = {
  R: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', soft: 'bg-orange-50' },
  I: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', soft: 'bg-blue-50' },
  A: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200', soft: 'bg-pink-50' },
  S: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', soft: 'bg-green-50' },
  E: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200', soft: 'bg-yellow-50' },
  C: { bg: 'bg-slate-500', text: 'text-slate-600', border: 'border-slate-200', soft: 'bg-slate-50' },
}

export default async function ProspekKarierPage({
  searchParams
}: {
  searchParams: Promise<{ major?: string; career?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessment = await prisma.assessment.findFirst({
    where: { user_id: user.id, status: 'COMPLETED' }, orderBy: { createdAt: 'desc' },
    include: { analysis: true }
  })
  if (!assessment || !assessment.analysis) redirect('/test')

  const riasecScores = assessment.analysis.riasec_scores as Record<string, number>
  const datScores = assessment.analysis.dat_scores as Record<string, number>

  const sortedTraits = Object.entries(riasecScores).sort((a, b) => b[1] - a[1])
  const riasecCode = sortedTraits.slice(0, 3).map(t => t[0]).join('')
  const suggestedField = (datScores['Numerical'] ?? 0) > (datScores['Verbal'] ?? 0) ? 'Saintek' : 'Soshum'

  const recommendation = getRiasecRecommendation(riasecCode)
  const allCareers = recommendation.careers.split(',').map(c => c.trim()).filter(Boolean)

  // Resolve params
  const resolvedSearch = await searchParams
  const selectedMajor = resolvedSearch.major ? decodeURIComponent(resolvedSearch.major) : null
  const highlightedCareer = resolvedSearch.career ? decodeURIComponent(resolvedSearch.career) : null

  const majorMeta = selectedMajor ? getMajorMeta(selectedMajor) : null

  // Build careers with metadata
  let careersWithMeta = allCareers.map(career => ({
    name: career,
    meta: getCareerMeta(career),
    isHighlighted: career === highlightedCareer
  }))

  // Smart Sorting & Strict Filtering based on selectedMajor
  if (selectedMajor && majorMeta) {
    const keywords = majorMeta.keyword.toLowerCase().split(/[ \W]+/)
    const majorWords = selectedMajor.toLowerCase().split(/[ \W]+/)
    const allKeywords = [...keywords, ...majorWords].filter(k => k.length > 2)

    // Calculate scores
    const scoredCareers = careersWithMeta.map(c => {
      let score = 0
      const nameL = c.name.toLowerCase()
      const descL = c.meta.description.toLowerCase()
      
      if (allKeywords.some(kw => nameL.includes(kw))) score += 5
      if (allKeywords.some(kw => descL.includes(kw))) score += 2
      c.meta.tags.forEach(tag => {
        if (allKeywords.some(kw => tag.toLowerCase().includes(kw))) score += 3
      })

      return { ...c, score }
    })

    // Strict filter: only those with score > 0
    let filtered = scoredCareers.filter(c => c.score > 0).sort((a, b) => b.score - a.score)
    
    // Fallback: if strictly filtered list is too small (e.g. < 4), just use the best scored ones even if score is 0
    // Actually, if score is 0, they don't match keywords. We just take the top 5 from the original RIASEC list.
    if (filtered.length < 4) {
      const existingNames = new Set(filtered.map(f => f.name))
      const fallback = scoredCareers.filter(c => !existingNames.has(c.name))
      filtered = [...filtered, ...fallback].slice(0, Math.max(4, filtered.length))
    }

    careersWithMeta = filtered.map(c => {
      const { score, ...rest } = c
      return rest
    })
  }

  // Highlighted career takes precedence if passed via URL
  if (highlightedCareer) {
    const idx = careersWithMeta.findIndex(c => c.name === highlightedCareer)
    if (idx > -1) {
      const [hl] = careersWithMeta.splice(idx, 1)
      careersWithMeta.unshift(hl)
    }
  }

  return (
    <ProspekKarierSection
      selectedMajor={selectedMajor}
      riasecCode={riasecCode}
      suggestedField={suggestedField}
      careers={careersWithMeta}
      riasecColors={RIASEC_COLORS}
    />
  )
}
