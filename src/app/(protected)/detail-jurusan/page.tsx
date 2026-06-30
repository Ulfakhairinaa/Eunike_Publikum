import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRiasecRecommendation } from '@/lib/constants/riasec-dict'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default async function DetailJurusanPage() {
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

  const recommendation = getRiasecRecommendation(riasecCode)
  const majors = recommendation.majors.split(',').map(m => m.trim()).filter(Boolean)

  // Kelompokkan jurusan berdasarkan bidang umum
  const sainsGroup = majors.filter(m =>
    /teknik|informatika|komputer|data|statistika|fisika|kimia|biologi|farmasi|kedokteran|keperawatan|gizi|kesehatan|aktuaria/i.test(m)
  )
  const soshumGroup = majors.filter(m => !sainsGroup.includes(m))

  // Juga ambil semua major dari DB jika ada
  const dbMajors = await prisma.major.findMany({
    include: { profiles: true, missions: { select: { id: true } } },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Detail Jurusan</h1>
        <p className="text-slate-500 mt-1">
          Jurusan yang direkomendasikan berdasarkan profil RIASEC <span className="font-bold text-primary">{riasecCode}</span> kamu.
        </p>
      </div>

      {/* Jurusan dari RIASEC dict */}
      <div className="space-y-5">
        {sainsGroup.length > 0 && (
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b py-4">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-600" />
                <span className="text-blue-700">Kelompok Saintek</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {sainsGroup.map((major, idx) => (
                  <Link key={idx} href={`/prospek-karier?major=${encodeURIComponent(major)}`}>
                    <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 hover:shadow-sm hover:border-blue-200 transition-all cursor-pointer h-full">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                        <GraduationCap size={16} className="text-blue-700" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{major}</p>
                      <p className="text-xs text-slate-500 mt-1">Saintek</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {soshumGroup.length > 0 && (
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b py-4">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap size={18} className="text-purple-600" />
                <span className="text-purple-700">Kelompok Soshum</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {soshumGroup.map((major, idx) => (
                  <Link key={idx} href={`/prospek-karier?major=${encodeURIComponent(major)}`}>
                    <div className="p-4 rounded-xl border border-purple-100 bg-purple-50 hover:shadow-sm hover:border-purple-200 transition-all cursor-pointer h-full">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                        <GraduationCap size={16} className="text-purple-700" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{major}</p>
                      <p className="text-xs text-slate-500 mt-1">Soshum</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* DB Majors jika ada */}
        {dbMajors.length > 0 && (
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b py-4">
              <CardTitle className="text-base">Program Studi dalam Database YO-MAP</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {dbMajors.map(major => (
                  <Link key={major.id} href={`/prospek-karier?major=${encodeURIComponent(major.name)}`}>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer h-full">
                      <p className="text-sm font-semibold text-slate-800">{major.name}</p>
                      {major.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{major.description}</p>
                      )}
                      <div className="flex gap-2 mt-2 text-xs text-slate-400">
                        <span>{major.missions.length} misi game</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
