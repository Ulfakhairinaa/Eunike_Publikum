import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { ArrowLeft, Stethoscope, Terminal, Building2, FlaskConical, GraduationCap, Briefcase, Palette, Megaphone, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'

// Slug helper: "Teknik & Rekayasa" → "teknik-rekayasa"
function toSlug(name: string) {
  return name.toLowerCase().replace(/[&,]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

// Map icon based on category name
const getCategoryIcon = (category: string) => {
  const c = category.toLowerCase()
  if (c.includes('kesehatan'))   return <Stethoscope size={32} />
  if (c.includes('teknik'))      return <FlaskConical size={32} />
  if (c.includes('komputasi'))   return <Terminal size={32} />
  if (c.includes('arsitektur'))  return <Building2 size={32} />
  if (c.includes('pendidikan'))  return <GraduationCap size={32} />
  if (c.includes('sosial'))      return <Users size={32} />
  if (c.includes('bisnis') || c.includes('ekonomi')) return <Briefcase size={32} />
  if (c.includes('bahasa') || c.includes('seni'))    return <Palette size={32} />
  if (c.includes('komunikasi'))  return <Megaphone size={32} />
  return <BookOpen size={32} />
}

export default async function ArenaPage({ params }: { params: Promise<{ arena: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const resolvedParams = await params
  const arenaName = resolvedParams.arena.charAt(0).toUpperCase() + resolvedParams.arena.slice(1)

  // Ambil semua major di arena ini beserta jumlah misi
  const majors = await prisma.major.findMany({
    where: {
      arena: { equals: arenaName, mode: 'insensitive' }
    },
    include: { missions: true }
  })

  // Group by category
  const categoriesMap: Record<string, { name: string; description: string; missionCount: number }> = {}
  majors.forEach(major => {
    if (!categoriesMap[major.category]) {
      categoriesMap[major.category] = {
        name: major.category,
        description: major.description,
        missionCount: 0
      }
    }
    categoriesMap[major.category].missionCount += major.missions.length
  })

  const categories = Object.values(categoriesMap)

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <Link href="/game-interaktif" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-4 w-fit">
          <ArrowLeft size={16} /> Kembali ke Kategori Utama
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">
          Eksplorasi <span className="text-blue-700">{arenaName}</span>
        </h1>
        <p className="text-slate-500 mt-2 max-w-3xl">
          Pilih sub-kategori minatmu untuk melihat berbagai misi eksplorasi karier dan jurusan yang sesuai dengan profil {arenaName}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const slug = toSlug(cat.name)
          return (
            <Link
              href={`/game-interaktif/${resolvedParams.arena.toLowerCase()}/${slug}`}
              key={cat.name}
            >
              <div className="rounded-xl border-2 border-transparent bg-[#466a8c] hover:bg-[#345371] shadow-sm hover:shadow-md text-white overflow-hidden transition-all h-[250px] flex flex-col justify-center items-center text-center p-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl shadow-inner flex items-center justify-center mb-4">
                  <div className="text-white">
                    {getCategoryIcon(cat.name)}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-2">{cat.name}</h3>
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed px-2">{cat.description}</p>
                </div>
                <div className="mt-auto w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/80">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                    <span>📋</span> {cat.missionCount} Misi Tersedia
                  </span>
                  <span className="text-white/60">Masuk &rarr;</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
