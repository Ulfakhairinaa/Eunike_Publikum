import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { History, CheckCircle2, Clock, ExternalLink } from 'lucide-react'

const RIASEC_NAMES: Record<string, string> = {
  R: 'Realistic', I: 'Investigative', A: 'Artistic',
  S: 'Social', E: 'Enterprising', C: 'Conventional'
}

export default async function RiwayatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessments = await prisma.assessment.findMany({
    where: { user_id: user.id },
    include: { analysis: true },
    orderBy: { createdAt: 'desc' }
  })

  const completedCount = assessments.filter(a => a.status === 'COMPLETED').length

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Riwayat Tes</h1>
        <p className="text-slate-500 mt-1">Semua sesi tes yang pernah kamu lakukan.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-primary">{assessments.length}</div>
          <div className="text-xs text-slate-500 mt-1">Total Sesi Tes</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-green-600">{completedCount}</div>
          <div className="text-xs text-slate-500 mt-1">Tes Selesai</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-slate-500">{assessments.length - completedCount}</div>
          <div className="text-xs text-slate-500 mt-1">Tes Belum Selesai</div>
        </div>
      </div>

      {assessments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <History size={48} className="text-slate-300" />
          <p className="text-slate-500 font-medium">Belum ada riwayat tes</p>
          <Link href="/test">
            <Button>Mulai Tes Sekarang</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {assessments.map((assessment, idx) => {
            const isCompleted = assessment.status === 'COMPLETED'
            const riasecScores = isCompleted && assessment.analysis
              ? assessment.analysis.riasec_scores as Record<string, number>
              : null
            const riasecCode = riasecScores
              ? Object.entries(riasecScores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(t => t[0]).join('')
              : null
            const datScores = isCompleted && assessment.analysis
              ? assessment.analysis.dat_scores as Record<string, number>
              : null
            const suggestedField = datScores
              ? ((datScores['Numerical'] || 0) > (datScores['Verbal'] || 0) ? 'Saintek' : 'Soshum')
              : null

            return (
              <Card key={assessment.id} className={`shadow-sm border-slate-200 ${idx === 0 ? 'ring-2 ring-primary/20' : ''}`}>
                <CardContent className="pt-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted ? 'bg-green-100' : 'bg-amber-100'
                    }`}>
                      {isCompleted
                        ? <CheckCircle2 size={20} className="text-green-600" />
                        : <Clock size={20} className="text-amber-600" />
                      }
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isCompleted ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isCompleted ? '✅ Selesai' : '⏳ Belum Selesai'}
                        </span>
                        {idx === 0 && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Terbaru
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          {new Date(assessment.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'long', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {isCompleted && riasecCode && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="p-2 bg-primary/5 rounded-lg">
                            <p className="text-xs text-primary font-medium">Kode RIASEC</p>
                            <p className="text-xl font-black text-primary">{riasecCode}</p>
                          </div>
                          {suggestedField && (
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <p className="text-xs text-blue-600 font-medium">Kecenderungan</p>
                              <p className="text-xl font-black text-blue-700">{suggestedField}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {isCompleted && riasecScores && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {Object.entries(riasecScores)
                            .sort((a, b) => b[1] - a[1])
                            .map(([trait, score]) => (
                              <span key={trait} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                                {trait} {Math.round((score / 30) * 100)}%
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    {isCompleted && (
                      <Link href="/hasil-analisis">
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5 shrink-0">
                          <ExternalLink size={14} />
                          Lihat Hasil
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
