import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'

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
  const suggestedField = datScores['Numerical'] > datScores['Verbal'] ? 'Saintek' : 'Soshum'

  const recommendation = getRiasecRecommendation(riasecCode)
  const majors = recommendation.majors.split(',').map(m => m.trim())
  const careers = recommendation.careers.split(',').map(c => c.trim())

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Rekomendasi Jurusan</h1>
        <p className="text-slate-500 mt-1">Berdasarkan profil RIASEC kamu: <span className="font-bold text-primary">{riasecCode}</span> dan kecenderungan <span className="font-bold text-blue-700">{suggestedField}</span>.</p>
      </div>

      <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
        Kode: {riasecCode} · Bidang: {suggestedField}
      </div>

      <div className="space-y-5">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-primary/5 border-b py-4">
            <CardTitle className="text-lg text-primary">🎓 Jurusan Linear yang Direkomendasikan</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="flex flex-wrap gap-2">
              {majors.map((major, idx) => (
                <Link key={idx} href={`/detail-jurusan?major=${encodeURIComponent(major)}`}>
                  <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
                    {major}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-green-50 border-b py-4">
            <CardTitle className="text-lg text-green-700">💼 Peluang Karier</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="flex flex-wrap gap-2">
              {careers.map((career, idx) => (
                <Link key={idx} href={`/prospek-karier?career=${encodeURIComponent(career)}`}>
                  <span className="inline-block px-3 py-1.5 bg-white text-slate-700 text-sm font-medium rounded-md border border-slate-200 shadow-sm hover:border-slate-300 transition-colors cursor-pointer">
                    {career}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link href="/hasil-analisis">
          <Button variant="outline">← Kembali ke Hasil Analisis</Button>
        </Link>
        <Link href="/detail-jurusan">
          <Button>Jelajahi Detail Jurusan →</Button>
        </Link>
      </div>
    </div>
  )
}
