import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FUN_FACTS, type Field, type Difficulty } from '@/lib/constants/career-map'

const RIASEC_NAMES: Record<string, string> = {
  R: 'Realistic', I: 'Investigative', A: 'Artistic',
  S: 'Social', E: 'Enterprising', C: 'Conventional'
}

export default async function HasilAnalisisPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessment = await prisma.assessment.findFirst({
    where: { user_id: user.id, status: 'COMPLETED' }, orderBy: { created_at: 'desc' },
    include: { analysis: true }
  })

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

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hasil Analisis</h1>
        <p className="text-slate-500 mt-1">Profil kepribadian dan kemampuan kognitifmu berdasarkan tes yang sudah diselesaikan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RIASEC */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-primary/5 border-b">
            <CardDescription className="text-primary font-medium uppercase text-xs tracking-wider">Kepribadian</CardDescription>
            <CardTitle className="text-xl pt-1">Profil RIASEC</CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-5">
            <div className="flex flex-col items-center justify-center py-5 bg-primary/10 rounded-xl">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Kode 3 Huruf Anda</span>
              <span className="text-5xl font-black text-primary tracking-tighter">{riasecCode}</span>
            </div>
            <div className="space-y-3">
              {sortedTraits.map(([trait, score]) => {
                const pct = Math.round((score / 30) * 100)
                return (
                  <div key={trait} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{trait} ({RIASEC_NAMES[trait]})</span>
                      <span className="font-semibold text-slate-500">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* DAT */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-blue-50 border-b">
            <CardDescription className="text-blue-700 font-medium uppercase text-xs tracking-wider">Tes Bakat Diferensial</CardDescription>
            <CardTitle className="text-xl pt-1">Kemampuan Kognitif</CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-5">
            <div className="flex flex-col items-center justify-center py-5 bg-blue-50 rounded-xl">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">Kecenderungan Bidang</span>
              <span className="text-4xl font-bold text-blue-800">{suggestedField}</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Verbal', score: verbalScore },
                { label: 'Numerik', score: numericScore },
                { label: 'Klarikal', score: klarikalScore },
              ].map(({ label, score }) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{label}</span>
                    <span className="font-semibold text-slate-500">{score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h4 className="text-xs font-semibold text-slate-700 mb-1">💡 Fun Fact:</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{funFact}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link href="/rekomendasi-jurusan">
          <Button size="lg" className="font-semibold">Lihat Rekomendasi Jurusan →</Button>
        </Link>
        <Link href="/prospek-karier">
          <Button variant="outline" size="lg">Lihat Prospek Karier</Button>
        </Link>
      </div>
    </div>
  )
}
