import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MissionInteractiveCards } from '@/components/game/MissionInteractiveCards'

// Slug → display name mapping agar bisa query DB dengan benar
function slugToSearchTerms(slug: string): string[] {
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
  const searchTerms = slugToSearchTerms(categorySlug)

  // Ambil semua major di arena dulu
  const allMajorsInArena = await prisma.major.findMany({
    where: {
      arena: { equals: arenaName, mode: 'insensitive' }
    }
  })

  // Cari major yang namanya cocok dengan slug
  const matchedMajor = allMajorsInArena.find(m => {
    const catLower = m.category.toLowerCase()
    return searchTerms.every(term => catLower.includes(term))
  })

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
      questions: { select: { id: true, scenario_text: true, option_a: true, option_b: true, option_c: true, option_d: true } },
      progress: { where: { user_id: user.id } }
    },
    orderBy: { level: 'asc' }
  })

  const initialPoints: Record<string, { status: string, points: number }> = {}
  missions.forEach(m => {
    if (m.progress && m.progress.length > 0) {
      initialPoints[m.id] = { status: m.progress[0].status, points: m.progress[0].current_points }
    }
  })

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
          Jalur Misi: <span className="text-blue-700">{categoryName}</span>
        </h1>
        <p className="text-slate-500 mt-2 max-w-3xl">
          Selesaikan setiap misi untuk mengasah wawasanmu dan membuka peluang karier di dunia {categoryName}. Arahkan (hover) ke kartu untuk melihat detail misi.
        </p>
      </div>

      <MissionInteractiveCards missions={missions} initialPoints={initialPoints} />
    </div>
  )
}
