import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft, Stethoscope, Terminal, Building2, FlaskConical,
  GraduationCap, Briefcase, Palette, Megaphone, Users, BookOpen, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

// Slug helper: "Teknik & Rekayasa" → "teknik-rekayasa"
function toSlug(name: string) {
  return name.toLowerCase().replace(/[&,]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

// Map icon based on category name
const getCategoryIcon = (category: string) => {
  const c = category.toLowerCase()
  if (c.includes('kesehatan'))   return <Stethoscope className="text-red-400"    size={24} />
  if (c.includes('teknik'))      return <FlaskConical className="text-blue-400"   size={24} />
  if (c.includes('komputasi'))   return <Terminal      className="text-indigo-400" size={24} />
  if (c.includes('arsitektur'))  return <Building2     className="text-orange-400" size={24} />
  if (c.includes('pendidikan'))  return <GraduationCap className="text-green-400"  size={24} />
  if (c.includes('sosial'))      return <Users         className="text-purple-400" size={24} />
  if (c.includes('bisnis') || c.includes('ekonomi')) return <Briefcase className="text-yellow-400" size={24} />
  if (c.includes('bahasa') || c.includes('seni'))    return <Palette   className="text-pink-400"   size={24} />
  if (c.includes('komunikasi'))  return <Megaphone    className="text-teal-400"   size={24} />
  return <BookOpen className="text-slate-400" size={24} />
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
          // Gunakan slug untuk URL agar aman dari karakter spesial
          const slug = toSlug(cat.name)
          return (
            <Link
              href={`/game-interaktif/${resolvedParams.arena.toLowerCase()}/${slug}`}
              key={cat.name}
            >
              <Card className="hover:border-blue-300 transition-all cursor-pointer h-full border-2 border-transparent bg-[#466a8c] hover:bg-[#345371] shadow-sm hover:shadow-md text-white">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl shadow-sm flex items-center justify-center">
                    <div className="text-white">
                      {getCategoryIcon(cat.name)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{cat.name}</h3>
                    <p className="text-sm text-white/70 mt-1 line-clamp-2">{cat.description}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/20 flex items-center justify-between text-xs font-medium text-white/80">
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded flex items-center justify-center text-[12px]">📋</span>
                      {cat.missionCount} Misi Tersedia
                    </span>
                    <ArrowRight size={14} className="text-white/60" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
        {categories.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Belum ada sub-kategori untuk arena ini.
          </div>
        )}
      </div>
    </div>
  )
}
