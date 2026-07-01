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

  // Preview careers
  const previewCareers = allCareers.slice(0, 5)

  // Other majors for sidebar
  const otherMajors = allMajors.filter(m => m !== selectedMajor).slice(0, 4)

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <Link href="/rekomendasi-jurusan" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={15} />
          Rekomendasi Jurusan
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-600 font-medium truncate">{selectedMajor}</span>
      </div>

      {/* ── Hero Banner ── */}
      <div className={`relative bg-gradient-to-br ${theme.gradient} rounded-2xl border ${majorMeta.themeColor === 'blue' ? 'border-blue-200' : `border-${majorMeta.themeColor}-200`} overflow-hidden`}>
        <div className="p-7 md:p-8">
          <div className="flex items-start gap-5">
            {/* Major icon */}
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl shrink-0">
              {majorMeta.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{selectedMajor}</h1>
              <p className={`text-sm font-semibold ${theme.text} mt-1`}>{majorMeta.keyword}</p>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed max-w-2xl">{majorMeta.description}</p>

              {/* Stats Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${theme.badge}`}>
                  <GraduationCap size={12} />
                  Gelar: {majorMeta.degree}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${majorMeta.group === 'Saintek' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                  <BookOpen size={12} />
                  {majorMeta.group}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${PROSPECT_COLORS[majorMeta.prospect]}`}>
                  <TrendingUp size={12} />
                  Prospek {majorMeta.prospect}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white text-slate-600 border-slate-200">
                  <Star size={12} className="text-yellow-500" />
                  Kode {riasecCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Detail Info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Tentang Jurusan */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <BookOpen size={17} className={`${theme.icon}`} />
              <h2 className="font-semibold text-slate-800">Tentang Jurusan</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-600 text-sm leading-relaxed">{majorMeta.fullDescription}</p>

              {/* Mata Kuliah Utama */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Mata Kuliah Utama</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {majorMeta.subjects.map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 size={14} className={`${theme.icon} shrink-0`} />
                      <span className="text-sm text-slate-700 font-medium">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kecocokan RIASEC */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <Zap size={17} className="text-yellow-500" />
              <h2 className="font-semibold text-slate-800">Mengapa Cocok untukmu?</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Profil RIASEC <span className="font-bold text-[#0B3B60]">{riasecCode}</span> kamu menunjukkan kecocokan yang tinggi dengan jurusan <strong>{selectedMajor}</strong>. 
                Kecenderungan bidang <span className="font-semibold text-blue-600">{suggestedField}</span> juga mendukung keberhasilan di jurusan ini.
              </p>

              {/* Code letter breakdown */}
              <div className="grid grid-cols-3 gap-3">
                {riasecCode.split('').map((letter, idx) => {
                  const score = riasecScores[letter] ?? 0
                  const pct = Math.round((score / totalScore) * 100)
                  const c = RIASEC_COLORS[letter] ?? RIASEC_COLORS['I']
                  const labels = ['Dominan', 'Sekunder', 'Tersier']
                  return (
                    <div key={letter} className={`${c.soft} ${c.border} border rounded-xl p-3 text-center`}>
                      <span className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center text-white font-bold text-sm mx-auto mb-2`}>{letter}</span>
                      <p className={`text-xs font-bold ${c.text}`}>{pct}%</p>
                      <p className="text-xs text-slate-400">{labels[idx]}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Other majors in same category */}
          {otherMajors.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap size={17} className="text-slate-400" />
                  <h2 className="font-semibold text-slate-800">Jurusan Lain yang Cocok</h2>
                </div>
                <Link href="/rekomendasi-jurusan" className="text-xs text-blue-600 hover:text-blue-700">Lihat Semua</Link>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {otherMajors.map((major, idx) => {
                    const m = getMajorMeta(major)
                    return (
                      <Link key={idx} href={`/detail-jurusan?major=${encodeURIComponent(major)}`}>
                        <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer">
                          <span className="text-xl">{m.emoji}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{major}</p>
                            <p className="text-xs text-slate-400">{m.group}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-5">
          {/* Match Score Card */}
          <div className="bg-gradient-to-br from-[#0B3B60] to-[#1a5f9e] rounded-2xl p-5 text-white shadow-lg">
            <p className="text-xs text-blue-200 font-semibold uppercase tracking-widest mb-3">Tingkat Kecocokan</p>
            <div className="flex items-center gap-4">
              {/* Circle */}
              <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="26"
                    fill="none" stroke="#60a5fa" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(matchPercent / 100) * 163.4} 163.4`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{matchPercent}%</span>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold">{matchPercent >= 85 ? 'Sangat Cocok' : matchPercent >= 70 ? 'Cocok' : 'Cukup Cocok'}</p>
                <p className="text-xs text-blue-200">Berdasarkan profil {riasecCode}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-blue-200">Kecenderungan bidang</p>
              <p className="text-sm font-semibold mt-0.5">{suggestedField} · {selectedMajor}</p>
            </div>
          </div>

          {/* Career Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-slate-400" />
                <h3 className="font-semibold text-slate-800 text-sm">Karier Populer</h3>
              </div>
              <Link href={`/prospek-karier?major=${encodeURIComponent(selectedMajor)}`} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                Lihat Semua
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {previewCareers.map((career, idx) => {
                const cm = getCareerMeta(career)
                return (
                  <Link key={idx} href={`/prospek-karier?major=${encodeURIComponent(selectedMajor)}`}>
                    <div className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                      <span className="text-lg shrink-0">{cm.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{career}</p>
                        <p className="text-xs text-slate-400">{cm.salaryRange}</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="p-4">
              <Link href={`/prospek-karier?major=${encodeURIComponent(selectedMajor)}`}>
                <button className="w-full flex items-center justify-center gap-2 bg-[#0B3B60] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#0a3356] transition-colors">
                  <TrendingUp size={15} />
                  Jelajahi Semua Karier
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Link href="/rekomendasi-jurusan" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} />
          Rekomendasi Jurusan
        </Link>
        <Link
          href={`/prospek-karier?major=${encodeURIComponent(selectedMajor)}`}
          className="flex items-center gap-2 bg-[#0B3B60] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#0a3356] transition-colors"
        >
          Lihat Prospek Karier
          <ChevronRight size={15} />
        </Link>
      </div>
    </div>
  )
}
