import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Lock, Rocket, HelpCircle, Flag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Slug → display name mapping agar bisa query DB dengan benar
// Slug: "teknik-rekayasa" → search: "Teknik & Rekayasa" di DB (case-insensitive)
// Kita cukup replace '-' dengan spasi dan query case-insensitive contains
function slugToSearchTerms(slug: string): string[] {
  // Ubah slug jadi kata-kata kunci tanpa tanda baca khusus
  return slug.split('-').filter(Boolean)
}

export default async function CategoryMissionsPage({ params }: { params: Promise<{ arena: string; category: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const resolvedParams = await params
  const arenaSlug = resolvedParams.arena
  const categorySlug = resolvedParams.category

  const arenaName = arenaSlug.charAt(0).toUpperCase() + arenaSlug.slice(1)

  // Cari major yang arena-nya cocok dan category-nya mengandung kata-kata dari slug
  // Contoh slug "teknik-rekayasa" → cari major dengan category LIKE "%teknik%" AND "%rekayasa%"
  const searchTerms = slugToSearchTerms(categorySlug)

  // Ambil semua major di arena dulu, lalu filter by slug matching
  const allMajorsInArena = await prisma.major.findMany({
    where: {
      arena: { equals: arenaName, mode: 'insensitive' }
    }
  })

  // Cari major yang namanya cocok dengan slug (semua kata harus ada di nama kategori)
  const matchedMajor = allMajorsInArena.find(m => {
    const catLower = m.category.toLowerCase()
    return searchTerms.every(term => catLower.includes(term))
  })

  // Nama kategori sebenarnya dari DB
  const categoryName = matchedMajor?.category ?? (categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))

  // Ambil missions dengan kategori yang sudah diketahui persis dari DB
  const missions = await prisma.gameMission.findMany({
    where: {
      major: {
        arena: { equals: arenaName, mode: 'insensitive' },
        category: matchedMajor ? { equals: matchedMajor.category } : { contains: searchTerms[0], mode: 'insensitive' }
      }
    },
    include: {
      questions: { select: { id: true } },
      progress: { where: { user_id: user.id } }
    },
    orderBy: { level: 'asc' }
  })

  // Total poin user dari semua progress
  const allProgress = await prisma.gameProgress.findMany({
    where: { user_id: user.id }
  })
  const totalPoints = allProgress.reduce((sum, p) => sum + p.current_points, 0)

  // Hitung misi yang sudah selesai di kategori ini
  const completedMissionsCount = missions.filter(m => m.progress[0]?.status === 'completed').length

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <Link
          href={`/game-interaktif/${arenaSlug}`}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-4 w-fit uppercase font-bold tracking-wider"
        >
          <ArrowLeft size={16} /> KEMBALI
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">
          Jalur Misi: {categoryName}
        </h1>
        <p className="text-slate-500 mt-2 max-w-3xl">
          Selesaikan setiap misi untuk mengasah wawasanmu dan membuka peluang karir di dunia {categoryName.toLowerCase()}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map((mission, idx) => {
          const progress = mission.progress[0]
          const isUnlocked = idx === 0 || totalPoints >= mission.min_point || (progress && progress.status !== 'locked')
          const isCompleted = progress?.status === 'completed'

          // Poin maks per misi = jumlah soal × 20 (SS)
          const maxPoints = mission.questions.length * 20

          let levelText = 'EASY'
          let levelColor = 'text-green-600 bg-green-100'
          let cardBorder = 'border-slate-200'

          if (mission.level === 2) {
            levelText = 'MEDIUM'
            levelColor = 'text-orange-600 bg-orange-100'
            cardBorder = 'border-orange-200'
          } else if (mission.level >= 3) {
            levelText = 'HARD'
            levelColor = 'text-red-600 bg-red-100'
            cardBorder = 'border-red-200'
          }

          if (isCompleted) cardBorder = 'border-blue-400'

          return (
            <Card
              key={mission.id}
              className={`relative overflow-hidden border-2 transition-all shadow-sm ${
                !isUnlocked ? 'bg-slate-50 opacity-70 border-slate-200' : cardBorder
              }`}
            >
              <CardContent className="p-6 space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-sm ${levelColor}`}>
                    {levelText}
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    maks {maxPoints} poin
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-800">{mission.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-3">
                    Jawab setiap pertanyaan berdasarkan pengalamanmu untuk mengetahui seberapa cocok kamu dengan bidang ini.
                  </p>
                </div>

                <div className="space-y-2 py-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <HelpCircle size={14} /> {mission.questions.length} Pertanyaan
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Flag size={14} /> Butuh {mission.min_point} poin untuk lanjut
                  </div>
                  {/* Sistem poin mini */}
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    {[['SS','bg-blue-500',20],['P','bg-indigo-400',15],['J','bg-slate-400',10],['BP','bg-slate-300',5]].map(([s,c,p]) => (
                      <span key={s} className="flex items-center gap-0.5 text-[9px] font-semibold text-slate-500">
                        <span className={`w-3.5 h-3.5 rounded-full ${c} text-white text-[7px] flex items-center justify-center`}>{s}</span>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  {isCompleted ? (
                    <Button variant="outline" className="w-full border-blue-500 text-blue-700 bg-blue-50" disabled>
                      Selesai ({progress?.current_points} poin)
                    </Button>
                  ) : isUnlocked ? (
                    <Link href={`/game-interaktif/play/${mission.id}`} className="block">
                      <Button className="w-full bg-[#0B3B60] hover:bg-[#072a44] text-white">
                        {progress ? 'Lanjut Misi' : 'Mulai Misi'}
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" className="w-full bg-slate-200 text-slate-500 flex items-center justify-center gap-2" disabled>
                      <Lock size={16} /> Terkunci ({mission.min_point} poin)
                    </Button>
                  )}
                </div>

                {!isUnlocked && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-10 flex-col gap-2">
                    <Lock size={32} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-500">Butuh {mission.min_point} poin</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {missions.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Belum ada misi untuk kategori ini.
          </div>
        )}
      </div>

      {/* Banner bawah */}
      <div className="bg-[#24527a] rounded-2xl p-8 text-white flex justify-between items-center relative overflow-hidden mt-8 shadow-md">
        <div className="relative z-10 max-w-2xl space-y-4">
          <h2 className="text-2xl font-bold">Ayo Capai Skor Maksimal!</h2>
          <p className="text-blue-100 text-sm">
            Setiap misi disesuaikan dengan pengalaman nyata mahasiswa {categoryName}. Raih poin tertinggi dengan menjawab jujur sesuai pengalamanmu!
          </p>
          <div className="flex gap-4 pt-2">
            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider mb-1">Misi Selesai</div>
              <div className="text-xl font-bold">{completedMissionsCount}/{missions.length}</div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider mb-1">Total XP</div>
              <div className="text-xl font-bold">{totalPoints}</div>
            </div>
          </div>
        </div>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center opacity-80">
          <Rocket size={64} className="text-white" />
        </div>
      </div>
    </div>
  )
}
