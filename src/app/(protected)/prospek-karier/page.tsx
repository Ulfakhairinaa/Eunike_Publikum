import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'
import { Briefcase, TrendingUp } from 'lucide-react'

const RIASEC_NAMES: Record<string, string> = {
  R: 'Realistic', I: 'Investigative', A: 'Artistic',
  S: 'Social', E: 'Enterprising', C: 'Conventional'
}

const RIASEC_CAREER_TRAITS: Record<string, { color: string; desc: string }> = {
  R: { color: 'bg-orange-50 border-orange-200 text-orange-700', desc: 'Pekerjaan teknis, lapangan, dan manual' },
  I: { color: 'bg-blue-50 border-blue-200 text-blue-700', desc: 'Penelitian, analisis, dan sains' },
  A: { color: 'bg-pink-50 border-pink-200 text-pink-700', desc: 'Kreatif, seni, dan desain' },
  S: { color: 'bg-green-50 border-green-200 text-green-700', desc: 'Sosial, pendidikan, dan pelayanan' },
  E: { color: 'bg-yellow-50 border-yellow-200 text-yellow-700', desc: 'Kepemimpinan, bisnis, dan wirausaha' },
  C: { color: 'bg-slate-50 border-slate-200 text-slate-700', desc: 'Administratif, terstruktur, dan akurat' },
}

export default async function ProspekKarierPage() {
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
  const topTrait = sortedTraits[0][0]
  const suggestedField = datScores['Numerical'] > datScores['Verbal'] ? 'Saintek' : 'Soshum'

  const recommendation = getRiasecRecommendation(riasecCode)
  const careers = recommendation.careers.split(',').map(c => c.trim()).filter(Boolean)

  // Pisah karier berdasarkan kategori
  const technicalCareers = careers.filter(c =>
    /insinyur|engineer|analis|developer|programmer|data|riset|dokter|apoteker|teknisi|arsitek|perancang/i.test(c)
  )
  const creativeCareers = careers.filter(c =>
    /desainer|kreator|seniman|penulis|direktur|produser/i.test(c)
  )
  const otherCareers = careers.filter(c => !technicalCareers.includes(c) && !creativeCareers.includes(c))

  const traitInfo = RIASEC_CAREER_TRAITS[topTrait]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Prospek Karier</h1>
        <p className="text-slate-500 mt-1">
          Daftar karier yang cocok berdasarkan profil <span className="font-bold text-primary">{riasecCode}</span> dan kecenderungan <span className="font-bold text-blue-700">{suggestedField}</span> kamu.
        </p>
      </div>

      {/* Profil dominan */}
      <div className={`rounded-xl p-5 border ${traitInfo?.color || 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div>
            <p className="font-bold text-lg">{topTrait} — {RIASEC_NAMES[topTrait]}</p>
            <p className="text-sm opacity-80 mt-0.5">{traitInfo?.desc}</p>
            <p className="text-sm font-medium mt-2">Kode lengkap: <span className="font-black">{riasecCode}</span> · Bidang: <span className="font-black">{suggestedField}</span></p>
          </div>
        </div>
      </div>

      {/* Semua karier */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase size={18} className="text-primary" />
            Peluang Karier Kamu ({careers.length} profesi)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {careers.map((career, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase size={14} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-700">{career}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insight bidang */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base">📈 Tren Pasar Kerja di Indonesia</CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="font-semibold text-blue-800 mb-1">🔵 Bidang {suggestedField}</p>
              <p>Kamu cenderung ke bidang {suggestedField}. {suggestedField === 'Saintek'
                ? 'Bidang ini memiliki permintaan tinggi terutama untuk profesi di sektor teknologi, kesehatan, dan rekayasa.'
                : 'Bidang ini sangat dibutuhkan di sektor pendidikan, pemerintahan, media, dan ekonomi kreatif.'}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="font-semibold text-green-800 mb-1">📊 Skill yang Direkomendasikan</p>
              <p>{topTrait === 'R' ? 'Keterampilan teknis dan fisik' :
                topTrait === 'I' ? 'Analisis data, riset, dan pemecahan masalah' :
                topTrait === 'A' ? 'Kreativitas, desain, dan komunikasi visual' :
                topTrait === 'S' ? 'Komunikasi interpersonal dan empati' :
                topTrait === 'E' ? 'Kepemimpinan, negosiasi, dan manajemen' :
                'Ketelitian, administrasi, dan manajemen data'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
