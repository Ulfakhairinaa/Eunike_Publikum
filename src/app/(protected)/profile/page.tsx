import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { DeleteAccountSection } from '@/components/profile/DeleteAccountSection'
import { Calendar, CheckCircle, ClipboardList, Shield } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) redirect('/auth/login')

  const assessmentCount = await prisma.assessment.count({ where: { user_id: user.id } })
  const completedCount = await prisma.assessment.count({
    where: { user_id: user.id, status: 'COMPLETED' }
  })

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const joinDate = new Date(dbUser.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0B3B60]">Profil Pengguna</h1>
        <p className="text-slate-500 mt-2 text-lg">Kelola informasi akun, preferensi, dan data dirimu di sini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Avatar & Statistik */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card Profil Utama */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 shadow-md bg-gradient-to-br from-[#0B3B60] to-[#1a5b8f]"
            >
              {getInitials(dbUser.name)}
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{dbUser.name}</h2>
            <p className="text-sm text-slate-500 font-medium mb-6 bg-slate-100 px-3 py-1 rounded-full">{dbUser.email}</p>
            
            <div className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 pt-4 border-t border-slate-100">
              <Calendar size={16} /> Bergabung sejak {joinDate}
            </div>
          </div>

          {/* Card Statistik */}
          <div className="bg-[#0B3B60] rounded-2xl p-6 text-white shadow-md">
            <h3 className="font-bold mb-4 flex items-center gap-2 opacity-90"><Shield size={18}/> Statistik Aktivitas</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-400/20 rounded-lg">
                    <ClipboardList size={20} className="text-blue-300" />
                  </div>
                  <span className="font-medium">Total Sesi Tes</span>
                </div>
                <span className="text-xl font-bold">{assessmentCount}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-400/20 rounded-lg">
                    <CheckCircle size={20} className="text-green-300" />
                  </div>
                  <span className="font-medium">Tes Selesai</span>
                </div>
                <span className="text-xl font-bold">{completedCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form Edit & Danger Zone */}
        <div className="lg:col-span-8 space-y-8">
          <ProfileForm user={{
            name: dbUser.name,
            email: dbUser.email,
            school: dbUser.school,
            gender: dbUser.gender
          }} />
          
          <DeleteAccountSection />
        </div>
        
      </div>
    </div>
  )
}
