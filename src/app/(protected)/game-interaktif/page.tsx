import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Gamepad2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function GameInteraktifPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const assessment = await prisma.assessment.findFirst({
    where: { user_id: user.id, status: 'COMPLETED' }, orderBy: { createdAt: 'desc' },
    include: { analysis: true }
  })

  if (!assessment || !assessment.analysis) redirect('/test')

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">INTERACTIVE EXPERIENCE</span>
        <h1 className="text-3xl font-bold text-slate-800">Pilih Arena Game</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Mulailah perjalanan eksplorasi melalui simulasi interaktif. Pilih kategori yang paling sesuai dengan minat dan bakat akademismu hari ini.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {/* Saintek Card */}
        <Card className="overflow-hidden border-2 hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
          <div className="h-48 bg-slate-100 relative group overflow-hidden">
             {/* Mock image background for Saintek */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-cyan-700 flex items-center justify-center">
                <Gamepad2 size={64} className="text-white opacity-80" />
             </div>
          </div>
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Saintek</h2>
            <p className="text-sm text-slate-500 line-clamp-3">
              Eksplorasi dunia sains, teknologi, teknik, dan matematika melalui tantangan logika dan eksperimen digital.
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">MEDICINE</span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">ENGINEERING</span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">AI</span>
            </div>
            <Link href="/game-interaktif/saintek" className="block pt-4">
              <Button className="w-full bg-[#0B3B60] hover:bg-[#072a44] text-white">
                Mulai Petualangan <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Soshum Card */}
        <Card className="overflow-hidden border-2 hover:border-[#6b4c1a] transition-all shadow-sm hover:shadow-md">
          <div className="h-48 bg-slate-100 relative group overflow-hidden">
             {/* Mock image background for Soshum */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#4a310d] to-[#8c672b] flex items-center justify-center">
                <Gamepad2 size={64} className="text-white opacity-80" />
             </div>
          </div>
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-2xl font-bold text-[#6b4c1a]">Soshum</h2>
            <p className="text-sm text-[#8c672b] line-clamp-3">
              Pahami dinamika sosial, ekonomi, hukum, dan seni. Uji kemampuan komunikasimu dalam simulasi interaktif nyata.
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-[10px] font-bold bg-amber-50 text-[#8c672b] px-2 py-1 rounded-md">ECONOMY</span>
              <span className="text-[10px] font-bold bg-amber-50 text-[#8c672b] px-2 py-1 rounded-md">LAW</span>
              <span className="text-[10px] font-bold bg-amber-50 text-[#8c672b] px-2 py-1 rounded-md">PSYCHOLOGY</span>
            </div>
            <Link href="/game-interaktif/soshum" className="block pt-4">
              <Button className="w-full bg-[#5c4015] hover:bg-[#3d290c] text-white">
                Mulai Petualangan <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
