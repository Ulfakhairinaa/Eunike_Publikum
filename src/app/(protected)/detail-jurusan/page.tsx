import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'
import { getMajorMeta } from '@/lib/constants/major-meta'
import { getCareerMeta } from '@/lib/constants/career-meta'
import {
  ArrowLeft, GraduationCap, BookOpen, Briefcase,
  CheckCircle2, TrendingUp, ChevronRight, Star, Zap
} from 'lucide-react'
import { DetailJurusanSection } from '@/components/sections/DetailJurusanSection'

const RIASEC_COLORS: Record<string, { bg: string; text: string; border: string; soft: string }> = {
  R: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', soft: 'bg-orange-50' },
  I: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', soft: 'bg-blue-50' },
  A: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200', soft: 'bg-pink-50' },
  S: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', soft: 'bg-green-50' },
  E: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200', soft: 'bg-yellow-50' },
  C: { bg: 'bg-slate-500', text: 'text-slate-600', border: 'border-slate-200', soft: 'bg-slate-50' },
}

const THEME_CLASSES: Record<string, { gradient: string; text: string; badge: string; icon: string }> = {
  blue:   { gradient: 'from-blue-50 to-blue-100/60', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'text-blue-600' },
  indigo: { gradient: 'from-indigo-50 to-indigo-100/60', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: 'text-indigo-600' },
  teal:   { gradient: 'from-teal-50 to-teal-100/60', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700 border-teal-200', icon: 'text-teal-600' },
  green:  { gradient: 'from-green-50 to-green-100/60', text: 'text-green-700', badge: 'bg-green-100 text-green-700 border-green-200', icon: 'text-green-600' },
  orange: { gradient: 'from-orange-50 to-orange-100/60', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700 border-orange-200', icon: 'text-orange-600' },
  purple: { gradient: 'from-purple-50 to-purple-100/60', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700 border-purple-200', icon: 'text-purple-600' },
  pink:   { gradient: 'from-pink-50 to-pink-100/60', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700 border-pink-200', icon: 'text-pink-600' },
  red:    { gradient: 'from-red-50 to-red-100/60', text: 'text-red-700', badge: 'bg-red-100 text-red-700 border-red-200', icon: 'text-red-600' },
  yellow: { gradient: 'from-yellow-50 to-yellow-100/60', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: 'text-yellow-600' },
  slate:  { gradient: 'from-slate-50 to-slate-100/60', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700 border-slate-200', icon: 'text-slate-600' },
}

const PROSPECT_COLORS: Record<string, string> = {
  'Sangat Luas': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Luas': 'bg-blue-100 text-blue-700 border-blue-200',
  'Baik': 'bg-orange-100 text-orange-700 border-orange-200',
}

export default async function DetailJurusanPage({
  searchParams
}: {
  searchParams: Promise<{ major?: string }>
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
  const topLetter = sortedTraits[0][0]
  const totalScore = sortedTraits.reduce((s, [, v]) => s + v, 0)
  const suggestedField = (datScores['Numerical'] ?? 0) > (datScores['Verbal'] ?? 0) ? 'Saintek' : 'Soshum'

  const recommendation = getRiasecRecommendation(riasecCode)
  const allMajors = recommendation.majors.split(',').map(m => m.trim()).filter(Boolean)
  const allCareers = recommendation.careers.split(',').map(c => c.trim()).filter(Boolean)

  // Resolve selected major
  const resolvedSearch = await searchParams
  const rawMajor = resolvedSearch.major ? decodeURIComponent(resolvedSearch.major) : null
  const selectedMajor = rawMajor ?? allMajors[0] ?? ''
  const majorMeta = getMajorMeta(selectedMajor)
  const theme = THEME_CLASSES[majorMeta.themeColor] ?? THEME_CLASSES['blue']

  // Match %
  const baseScore = riasecScores[topLetter] ?? 0
  const basePercent = Math.min(95, Math.round(55 + (baseScore / totalScore) * 100 * 1.4))
  const selectedIdx = allMajors.findIndex(m => m === selectedMajor)
  const matchPercent = Math.max(52, basePercent - Math.max(0, selectedIdx) * Math.ceil((basePercent - 52) / Math.max(allMajors.length - 1, 1)))

  // Strict filtering for preview careers
  const keywords = majorMeta.keyword.toLowerCase().split(/[ \W]+/)
  const majorWords = selectedMajor.toLowerCase().split(/[ \W]+/)
  const allKeywords = [...keywords, ...majorWords].filter(k => k.length > 2)

  const scoredCareers = allCareers.map(careerName => {
    const cm = getCareerMeta(careerName)
    let score = 0
    const nameL = careerName.toLowerCase()
    const descL = cm.description.toLowerCase()
    
    if (allKeywords.some(kw => nameL.includes(kw))) score += 5
    if (allKeywords.some(kw => descL.includes(kw))) score += 2
    cm.tags.forEach(tag => {
      if (allKeywords.some(kw => tag.toLowerCase().includes(kw))) score += 3
    })

    return { name: careerName, score }
  })

  let filtered = scoredCareers.filter(c => c.score > 0).sort((a, b) => b.score - a.score)
  if (filtered.length < 3) {
    const existingNames = new Set(filtered.map(f => f.name))
    const fallback = scoredCareers.filter(c => !existingNames.has(c.name))
    filtered = [...filtered, ...fallback].slice(0, Math.max(3, filtered.length))
  }
  
  const previewCareers = filtered.map(f => f.name).slice(0, 5)

  // Other majors for sidebar
  const otherMajors = allMajors.filter(m => m !== selectedMajor).slice(0, 4)

  return (
    <DetailJurusanSection
      userName={user.user_metadata?.name || 'User'}
      selectedMajor={selectedMajor}
      majorMeta={{
        degree: majorMeta.degree,
        group: majorMeta.group,
        prospect: majorMeta.prospect,
        description: majorMeta.description,
        fullDescription: majorMeta.fullDescription,
        subjects: majorMeta.subjects,
        emoji: majorMeta.emoji
      }}
      matchPercent={matchPercent}
      riasecCode={riasecCode}
      previewCareers={previewCareers}
    />
  )
}
