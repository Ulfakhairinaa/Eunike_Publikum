import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gamepad2, Lock, CheckCircle2, Play } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function GameInteraktifPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessment = await prisma.assessment.findFirst({
    where: { user_id: user.id, status: 'COMPLETED' },
    include: { analysis: true }
  })

  if (!assessment || !assessment.analysis) redirect('/test')

  const riasecScores = assessment.analysis.riasec_scores as Record<string, number>
  const sortedTraits = Object.entries(riasecScores).sort((a, b) => b[1] - a[1])
  const riasecCode = sortedTraits.slice(0, 3).map(t => t[0]).join('')

  // Ambil semua missions dari DB beserta progress user
  const missions = await prisma.gameMission.findMany({
    include: {
      major: true,
      questions: { select: { id: true } },
      progress: {
        where: { user_id: user.id }
      }
    },
    orderBy: [{ major_id: 'asc' }, { level: 'asc' }]
  })

  const userProgress = await prisma.gameProgress.findMany({
    where: { user_id: user.id }
  })

  const totalPoints = userProgress.reduce((sum, p) => sum + p.current_points, 0)
  const completedCount = userProgress.filter(p => p.status === 'completed').length

  // Jika tidak ada missions di DB, tampilkan pesan
  if (missions.length === 0) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Game Interaktif</h1>
          <p className="text-slate-500 mt-1">Eksplorasi dunia karier melalui misi-misi interaktif!</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <Gamepad2 size={48} className="text-slate-300" />
          <p className="text-slate-500 font-medium">Misi belum tersedia</p>
          <p className="text-slate-400 text-sm max-w-md">
            Konten game sedang disiapkan. Jalankan seed database untuk mengisi misi-misi interaktif.
          </p>
        </div>
      </div>
    )
  }

  // Group missions by major
  const missionsByMajor: Record<string, typeof missions> = {}
  missions.forEach(mission => {
    const majorName = mission.major.name
    if (!missionsByMajor[majorName]) missionsByMajor[majorName] = []
    missionsByMajor[majorName].push(mission)
  })

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Game Interaktif</h1>
        <p className="text-slate-500 mt-1">Eksplorasi dunia karier melalui misi-misi skenario interaktif!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Poin', value: totalPoints, color: 'text-primary' },
          { label: 'Misi Selesai', value: `${completedCount}/${missions.length}`, color: 'text-green-600' },
          { label: 'Kode RIASEC', value: riasecCode, color: 'text-blue-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Missions by major */}
      {Object.entries(missionsByMajor).map(([majorName, majorMissions]) => (
        <Card key={majorName} className="shadow-sm border-slate-200">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Gamepad2 size={18} className="text-primary" />
              {majorName}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {majorMissions.map((mission, idx) => {
              const progress = mission.progress[0]
              const status = progress?.status || (idx === 0 ? 'unlocked' : 'locked')
              const isCompleted = status === 'completed'
              const isLocked = status === 'locked'

              return (
                <div
                  key={mission.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    isCompleted
                      ? 'border-green-200 bg-green-50'
                      : isLocked
                        ? 'border-slate-100 bg-slate-50 opacity-60'
                        : 'border-slate-200 bg-white hover:border-primary/30 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isCompleted ? 'bg-green-100' : isLocked ? 'bg-slate-100' : 'bg-primary/10'
                  }`}>
                    {isCompleted
                      ? <CheckCircle2 size={20} className="text-green-600" />
                      : isLocked
                        ? <Lock size={20} className="text-slate-400" />
                        : <Play size={20} className="text-primary" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{mission.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Level {mission.level} · {mission.questions.length} pertanyaan · Min. {mission.min_point} poin</p>
                  </div>
                  {isCompleted && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {progress?.current_points} poin
                    </span>
                  )}
                  {!isLocked && !isCompleted && (
                    <Link href={`/game-interaktif/${mission.id}`}>
                      <Button size="sm">Mulai</Button>
                    </Link>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
