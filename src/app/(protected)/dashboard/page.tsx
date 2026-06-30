import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ClipboardList, BarChart2, BookOpen, CheckCircle2, Clock, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [dbUser, assessment] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.assessment.findFirst({
      where: { user_id: user.id },
      include: { analysis: true },
      orderBy: { createdAt: 'desc' }
    })
  ])

  const isCompleted = assessment?.status === 'COMPLETED'
  const riasecScores = isCompleted && assessment?.analysis
    ? assessment.analysis.riasec_scores as Record<string, number>
    : null
  const riasecCode = riasecScores
    ? Object.entries(riasecScores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(t => t[0]).join('')
    : null

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Selamat datang, {dbUser?.name?.split(' ')[0] || 'Siswa'}! 👋
        </h1>
        <p className="text-slate-500 mt-1">
          {isCompleted ? 'Kamu sudah menyelesaikan tes. Jelajahi hasil dan rekomendasimu!' : 'Mulai perjalananmu dengan mengikuti tes minat & bakat.'}
        </p>
      </div>

      {/* Status Banner */}
      <div className={`rounded-xl p-4 border flex items-center gap-4 ${
        isCompleted ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
      }`}>
        {isCompleted
          ? <CheckCircle2 className="text-green-600 shrink-0" size={22} />
          : <Clock className="text-amber-600 shrink-0" size={22} />
        }
        <div className="flex-1">
          <p className={`font-semibold text-sm ${isCompleted ? 'text-green-800' : 'text-amber-800'}`}>
            {isCompleted ? `Tes Selesai ✅  —  Kode RIASEC: ${riasecCode}` : 'Tes Belum Selesai'}
          </p>
          <p className={`text-sm opacity-80 ${isCompleted ? 'text-green-700' : 'text-amber-700'}`}>
            {isCompleted
              ? 'Lihat hasil analisis dan rekomendasi jurusan personalmu di menu kiri.'
              : 'Selesaikan tes RIASEC & DAT untuk mendapatkan analisis dan rekomendasi jurusan yang tepat.'}
          </p>
        </div>
        {!isCompleted && (
          <Link href="/test">
            <Button size="sm" className="whitespace-nowrap shrink-0">Mulai Sekarang</Button>
          </Link>
        )}
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
              <ClipboardList size={20} className="text-primary" />
            </div>
            <CardTitle className="text-base">Tes Minat & Bakat</CardTitle>
            <CardDescription className="text-xs">36 soal RIASEC + 15 soal DAT</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/test">
              <Button className="w-full" size="sm" variant={isCompleted ? 'outline' : 'default'}>
                {isCompleted ? 'Ulangi Tes' : 'Mulai Tes'}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className={`border-slate-200 shadow-sm transition-shadow ${!isCompleted ? 'opacity-50' : 'hover:shadow-md'}`}>
          <CardHeader className="pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2">
              <BarChart2 size={20} className="text-blue-600" />
            </div>
            <CardTitle className="text-base">Hasil Analisis</CardTitle>
            <CardDescription className="text-xs">Profil RIASEC & kemampuan kognitifmu</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/hasil-analisis">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm" disabled={!isCompleted}>
                Lihat Hasil
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className={`border-slate-200 shadow-sm transition-shadow ${!isCompleted ? 'opacity-50' : 'hover:shadow-md'}`}>
          <CardHeader className="pb-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-2">
              <BookOpen size={20} className="text-green-600" />
            </div>
            <CardTitle className="text-base">Rekomendasi Jurusan</CardTitle>
            <CardDescription className="text-xs">Jurusan & karier sesuai profilmu</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/rekomendasi-jurusan">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm" disabled={!isCompleted}>
                Lihat Rekomendasi
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* RIASEC mini chart if completed */}
      {isCompleted && riasecScores && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              <CardTitle className="text-base">Ringkasan Profil RIASEC</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(riasecScores)
                .sort((a, b) => b[1] - a[1])
                .map(([trait, score]) => {
                  const names: Record<string, string> = {
                    R: 'Realistic', I: 'Investigative', A: 'Artistic',
                    S: 'Social', E: 'Enterprising', C: 'Conventional'
                  }
                  const pct = Math.round((score / 30) * 100)
                  return (
                    <div key={trait} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-600">{trait} – {names[trait]}</span>
                        <span className="font-bold text-slate-700">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-primary rounded-full h-1.5" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
