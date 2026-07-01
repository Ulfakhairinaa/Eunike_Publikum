import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'
import { getMajorMeta } from '@/lib/constants/major-meta'
import { getCareerMeta, CareerMeta } from '@/lib/constants/career-meta'
import {
  ArrowLeft, Briefcase, TrendingUp, Star,
  ChevronRight, DollarSign, Zap, Info, GraduationCap
} from 'lucide-react'

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

const DEMAND_COLORS: Record<string, string> = {
  'Sangat Tinggi': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Tinggi': 'bg-blue-100 text-blue-700 border-blue-200',
  'Sedang': 'bg-amber-100 text-amber-700 border-amber-200',
}

const DEMAND_DOT: Record<string, string> = {
  'Sangat Tinggi': 'bg-emerald-500',
  'Tinggi': 'bg-blue-500',
  'Sedang': 'bg-amber-500',
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
  const topLetter = sortedTraits[0][0]
  const totalScore = sortedTraits.reduce((s, [, v]) => s + v, 0)
  const suggestedField = (datScores['Numerical'] ?? 0) > (datScores['Verbal'] ?? 0) ? 'Saintek' : 'Soshum'

  const recommendation = getRiasecRecommendation(riasecCode)
  const allCareers = recommendation.careers.split(',').map(c => c.trim()).filter(Boolean)
  const allMajors = recommendation.majors.split(',').map(m => m.trim()).filter(Boolean)

  // Resolve params
  const resolvedSearch = await searchParams
  const selectedMajor = resolvedSearch.major ? decodeURIComponent(resolvedSearch.major) : null
  const highlightedCareer = resolvedSearch.career ? decodeURIComponent(resolvedSearch.career) : null

  const majorMeta = selectedMajor ? getMajorMeta(selectedMajor) : null

  // Build careers with metadata
  const careersWithMeta = allCareers.map(career => ({
    name: career,
    meta: getCareerMeta(career),
    isHighlighted: career === highlightedCareer
  }))

  // Featured career = highlighted or first
  const featuredCareer = careersWithMeta.find(c => c.isHighlighted) ?? careersWithMeta[0]
  const otherCareers = careersWithMeta.filter(c => c.name !== (featuredCareer?.name ?? ''))

  const topColor = RIASEC_COLORS[topLetter] ?? RIASEC_COLORS['I']

  // Insight text per dominant trait
  const TRAIT_INSIGHT: Record<string, { title: string; desc: string; skills: string[] }> = {
    R: { title: 'Realis — Berbasis Praktik', desc: 'Kamu unggul di pekerjaan teknis, lapangan, dan yang melibatkan keterampilan fisik serta alat-alat konkret.', skills: ['Keterampilan Teknis', 'Problem Solving', 'Kerja Lapangan', 'Presisi'] },
    I: { title: 'Investigatif — Berbasis Analisis', desc: 'Kamu unggul di pekerjaan riset, sains, dan analisis yang membutuhkan pemikiran logis mendalam.', skills: ['Analisis Data', 'Riset Ilmiah', 'Pemecahan Masalah', 'Critical Thinking'] },
    A: { title: 'Artistik — Berbasis Kreativitas', desc: 'Kamu unggul di pekerjaan kreatif, ekspresif, dan yang melibatkan seni, desain, atau inovasi.', skills: ['Kreativitas', 'Desain Visual', 'Storytelling', 'Inovasi'] },
    S: { title: 'Sosial — Berbasis Empati', desc: 'Kamu unggul di pekerjaan yang berinteraksi dengan orang, membantu, mengajar, atau melayani.', skills: ['Komunikasi Interpersonal', 'Empati', 'Kolaborasi', 'Kepemimpinan'] },
    E: { title: 'Enterprising — Berbasis Kepemimpinan', desc: 'Kamu unggul di pekerjaan yang memimpin, meyakinkan, atau mengembangkan bisnis.', skills: ['Negosiasi', 'Kepemimpinan', 'Kewirausahaan', 'Strategi Bisnis'] },
    C: { title: 'Conventional — Berbasis Ketepatan', desc: 'Kamu unggul di pekerjaan yang terstruktur, detail, dan membutuhkan akurasi tinggi.', skills: ['Ketelitian', 'Administrasi', 'Manajemen Data', 'Kepatuhan Prosedur'] },
  }
  const traitInsight = TRAIT_INSIGHT[topLetter] ?? TRAIT_INSIGHT['I']

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Link href={selectedMajor ? `/detail-jurusan?major=${encodeURIComponent(selectedMajor)}` : '/rekomendasi-jurusan'} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft size={15} />
            {selectedMajor ? `Detail: ${selectedMajor}` : 'Rekomendasi Jurusan'}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-sm text-slate-600 font-medium">Prospek Karier</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Prospek Karier</h1>
            <p className="text-slate-500 mt-1.5 text-base leading-relaxed">
              {selectedMajor
                ? <>Karier yang tersedia untuk lulusan <span className="font-semibold text-slate-700">{selectedMajor}</span> berdasarkan profil <span className="font-bold text-[#0B3B60]">{riasecCode}</span> kamu.</>
                : <>Daftar karier yang cocok berdasarkan profil RIASEC <span className="font-bold text-[#0B3B60]">{riasecCode}</span> dan kecenderungan <span className="font-semibold text-blue-600">{suggestedField}</span> kamu.</>
              }
            </p>
          </div>

          {/* Code badge */}
          <div className="shrink-0 hidden sm:block">
            <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-sm">
              {riasecCode.split('').map((letter, i) => (
                <span key={i} className={`w-7 h-7 rounded-lg ${RIASEC_COLORS[letter]?.bg ?? 'bg-slate-400'} flex items-center justify-center text-white font-bold text-xs`}>
                  {letter}
                </span>
              ))}
              <span className="text-sm font-bold text-slate-600 pl-1">{riasecCode}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 text-right">{careersWithMeta.length} profesi tersedia</p>
          </div>
        </div>
      </div>

      {/* ── Featured Career ── */}
      {featuredCareer && (
        <div className="relative bg-gradient-to-br from-[#0B3B60] to-[#1a5f9e] rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-16 -translate-x-16" />

          <div className="relative p-7 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Star size={14} className="text-yellow-300 fill-yellow-300" />
              <span className="text-xs font-semibold text-yellow-300 uppercase tracking-widest">Rekomendasi Utama</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-3xl shrink-0">
                  {featuredCareer.meta.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">{featuredCareer.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${DEMAND_COLORS[featuredCareer.meta.demand]}`}>
                      Permintaan {featuredCareer.meta.demand}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/15 text-white border border-white/20">
                      💰 {featuredCareer.meta.salaryRange}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:max-w-xs">
                <p className="text-blue-100 text-sm leading-relaxed">{featuredCareer.meta.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {featuredCareer.meta.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-white/10 text-blue-100 px-2.5 py-1 rounded-full border border-white/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── All Careers Grid ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Semua Profesi ({careersWithMeta.length})</h2>
          <p className="text-xs text-slate-400">Berdasarkan kode {riasecCode}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCareers.map((career, idx) => (
            <div
              key={idx}
              className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-xl transition-colors shrink-0">
                  {career.meta.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{career.name}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{career.meta.description}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign size={11} className="text-green-500" />
                  <span className="text-xs text-slate-600 font-medium">{career.meta.salaryRange}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${DEMAND_DOT[career.meta.demand]}`} />
                  <span className="text-xs text-slate-500">{career.meta.demand}</span>
                </div>
              </div>

              {career.meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {career.meta.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Insight Panel ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Dominant Trait */}
        <div className={`${topColor.soft} ${topColor.border} border rounded-2xl p-5`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${topColor.bg} flex items-center justify-center shrink-0`}>
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <p className={`text-sm font-bold ${topColor.text}`}>{topLetter} — {traitInsight.title}</p>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{traitInsight.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {traitInsight.skills.map((skill, i) => (
                  <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-lg bg-white/70 ${topColor.text} border ${topColor.border}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bidang Insight */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/60 border border-blue-100 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-700">Tren Pasar Kerja — {suggestedField}</p>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {suggestedField === 'Saintek'
                  ? 'Permintaan tenaga kerja bidang Saintek terus meningkat, terutama di sektor teknologi, kesehatan, dan rekayasa. Potensi karier dan gaji sangat kompetitif.'
                  : 'Bidang Soshum sangat dibutuhkan di sektor pendidikan, hukum, media, pemerintahan, dan ekonomi kreatif yang terus berkembang pesat.'}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: suggestedField === 'Saintek' ? '82%' : '74%' }} />
                </div>
                <span className="text-xs font-bold text-blue-600">{suggestedField === 'Saintek' ? '82%' : '74%'}</span>
                <span className="text-xs text-slate-400">Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIASEC Trait Scores ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Info size={15} className="text-slate-400" />
          <h3 className="font-semibold text-slate-700 text-sm">Skor RIASEC Kamu</h3>
        </div>
        <div className="space-y-3">
          {sortedTraits.map(([letter, score]) => {
            const pct = Math.round((score / totalScore) * 100)
            const c = RIASEC_COLORS[letter] ?? RIASEC_COLORS['I']
            return (
              <div key={letter} className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center text-white font-bold text-xs shrink-0`}>{letter}</span>
                <span className="text-xs text-slate-500 w-24 shrink-0">{RIASEC_NAMES[letter]}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.bg} transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-600 w-10 text-right shrink-0">{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Link
          href={selectedMajor ? `/detail-jurusan?major=${encodeURIComponent(selectedMajor)}` : '/rekomendasi-jurusan'}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={16} />
          {selectedMajor ? 'Kembali ke Detail Jurusan' : 'Rekomendasi Jurusan'}
        </Link>
        <Link
          href="/rekomendasi-jurusan"
          className="flex items-center gap-2 bg-[#0B3B60] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#0a3356] transition-colors"
        >
          <GraduationCap size={15} />
          Eksplorasi Jurusan Lain
        </Link>
      </div>
    </div>
  )
}
