import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'
import { getMajorMeta } from '@/lib/constants/major-meta'
import { getCareerMeta } from '@/lib/constants/career-meta'
import { ChevronRight, Star, Briefcase, BookOpen, TrendingUp, ArrowLeft, Sparkles } from 'lucide-react'

const RIASEC_NAMES: Record<string, string> = {
  R: 'Realistic', I: 'Investigative', A: 'Artistic',
  S: 'Social', E: 'Enterprising', C: 'Conventional'
}

const RIASEC_COLORS: Record<string, { bg: string; text: string; border: string; soft: string }> = {
  R: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', soft: 'bg-orange-50' },
  I: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', soft: 'bg-blue-50' },
  A: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200', soft: 'bg-pink-50' },
  S: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', soft: 'bg-green-50' },
  E: { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200', soft: 'bg-yellow-50' },
  C: { bg: 'bg-slate-500', text: 'text-slate-600', border: 'border-slate-200', soft: 'bg-slate-50' },
}

export default async function RekomendasiJurusanPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessment = await prisma.assessment.findFirst({
    where: { user_id: user.id, status: 'COMPLETED' },
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
  const majors = recommendation.majors.split(',').map(m => m.trim()).filter(Boolean)
  const careers = recommendation.careers.split(',').map(c => c.trim()).filter(Boolean)

  // Hitung match % per jurusan berdasarkan posisi & skor dominan
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
  const topColor = RIASEC_COLORS[topLetter] ?? RIASEC_COLORS['I']

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/hasil-analisis" className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              <ArrowLeft size={14} />
              Hasil Analisis
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Rekomendasi Jurusan</h1>
          <p className="text-slate-500 mt-1.5 text-base">
            Jurusan yang paling cocok berdasarkan profil RIASEC kamu
          </p>
        </div>
        {/* RIASEC Code Badge */}
        <div className="shrink-0 text-right">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm">
            <div className="flex gap-0.5">
              {riasecCode.split('').map((letter, i) => (
                <span key={i} className={`w-8 h-8 rounded-lg ${RIASEC_COLORS[letter]?.bg ?? 'bg-slate-400'} flex items-center justify-center text-white font-bold text-sm`}>
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-left pl-1">
              <p className="text-xs text-slate-400 leading-none">Kode RIASEC</p>
              <p className="text-sm font-bold text-slate-700 leading-tight">{riasecCode}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{suggestedField} · {majors.length} jurusan tersedia</p>
        </div>
      </div>

      {/* ── Main Grid: Featured + List ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured / Pilihan Teratas */}
        {topMajor && (
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-[#0B3B60] to-[#1a5f9e] rounded-2xl p-6 text-white shadow-xl overflow-hidden h-full flex flex-col">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-14 -translate-x-14" />

              <div className="relative">
                <div className="flex items-center gap-1.5 mb-5">
                  <Sparkles size={14} className="text-yellow-300" />
                  <span className="text-xs font-semibold text-yellow-300 uppercase tracking-widest">Pilihan Teratas</span>
                </div>

                {/* Match circle */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7" />
                      <circle
                        cx="40" cy="40" r="34"
                        fill="none" stroke="#60a5fa" strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={`${(topMajor.matchPercent / 100) * 213.6} 213.6`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base font-bold text-white">{topMajor.matchPercent}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 mb-0.5">Tingkat Kecocokan</p>
                    <p className="text-2xl font-bold leading-tight">{topMajor.meta.emoji} {topMajor.major}</p>
                    <p className="text-xs text-blue-200 mt-1">{topMajor.meta.keyword}</p>
                  </div>
                </div>

                <p className="text-sm text-blue-100 leading-relaxed mb-5">
                  {topMajor.meta.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">{topMajor.meta.degree}</span>
                  <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">{topMajor.meta.group}</span>
                  <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium">Prospek {topMajor.meta.prospect}</span>
                </div>

                <Link href={`/detail-jurusan?major=${encodeURIComponent(topMajor.major)}`}>
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-[#0B3B60] font-semibold text-sm py-3 rounded-xl hover:bg-blue-50 transition-colors">
                    Lihat Detail Lengkap
                    <ChevronRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Ranked List */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-slate-800">Rekomendasi Lainnya</h2>
            <span className="text-xs text-slate-400">{otherMajors.length} jurusan</span>
          </div>

          {otherMajors.map((item, idx) => (
            <Link key={idx} href={`/detail-jurusan?major=${encodeURIComponent(item.major)}`}>
              <div className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-lg transition-colors shrink-0">
                    {item.meta.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.major}</p>
                      <span className="text-sm font-bold text-blue-600 shrink-0">{item.matchPercent}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                        style={{ width: `${item.matchPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-slate-400">{item.meta.degree}</span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className={`text-xs font-medium ${item.meta.group === 'Saintek' ? 'text-blue-500' : 'text-purple-500'}`}>{item.meta.group}</span>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400 transition-colors shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Career Preview Banner ── */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase size={15} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Peluang Karier Kamu</h3>
              <p className="text-xs text-slate-500">{careers.length} profesi sesuai profil {riasecCode}</p>
            </div>
          </div>
          <Link href={`/prospek-karier`} className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700">
            Lihat Semua <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {previewCareers.map((career, idx) => {
            const meta = getCareerMeta(career)
            return (
              <Link key={idx} href={`/prospek-karier?career=${encodeURIComponent(career)}`}>
                <div className="bg-white rounded-xl border border-blue-100 p-3.5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer h-full">
                  <div className="text-2xl mb-2">{meta.emoji}</div>
                  <p className="text-xs font-semibold text-slate-700 leading-tight line-clamp-2">{career}</p>
                  <p className="text-xs text-slate-400 mt-1">{meta.salaryRange}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Insight RIASEC ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sortedTraits.slice(0, 3).map(([letter, score], idx) => {
          const c = RIASEC_COLORS[letter] ?? RIASEC_COLORS['I']
          const pct = Math.round((score / totalScore) * 100)
          return (
            <div key={letter} className={`${c.soft} ${c.border} border rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center text-white font-bold text-sm`}>{letter}</span>
                <div>
                  <p className={`text-xs font-semibold ${c.text}`}>{RIASEC_NAMES[letter]}</p>
                  <p className="text-xs text-slate-400">#{idx + 1} Dominan</p>
                </div>
              </div>
              <div className="h-1.5 bg-white/70 rounded-full overflow-hidden mt-1">
                <div className={`h-full rounded-full ${c.bg}`} style={{ width: `${pct}%` }} />
              </div>
              <p className={`text-xs font-bold ${c.text} mt-1`}>{pct}% dari total skor</p>
            </div>
          )
        })}
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Link href="/hasil-analisis" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} />
          Kembali ke Hasil Analisis
        </Link>
        <Link href="/prospek-karier" className="flex items-center gap-2 bg-[#0B3B60] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#0a3356] transition-colors">
          <TrendingUp size={16} />
          Lihat Semua Prospek Karier
        </Link>
      </div>
    </div>
  )
}
