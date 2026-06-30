import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, School, Users } from 'lucide-react'

async function updateProfile(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const name = formData.get('name') as string
  const school = formData.get('school') as string
  const gender = formData.get('gender') as string

  await prisma.user.update({
    where: { id: user.id },
    data: { name, school, gender }
  })

  revalidatePath('/profile')
}

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

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
        <p className="text-slate-500 mt-1">Kelola informasi akun dan data dirimu.</p>
      </div>

      {/* Avatar & stats */}
      <div className="flex items-center gap-5 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shrink-0"
          style={{ background: '#003D76' }}
        >
          {getInitials(dbUser.name)}
        </div>
        <div className="flex-1">
          <p className="text-lg font-bold text-slate-800">{dbUser.name}</p>
          <p className="text-sm text-slate-500">{dbUser.email}</p>
          <div className="flex gap-4 mt-2 text-xs text-slate-500">
            <span>{assessmentCount} sesi tes</span>
            <span>·</span>
            <span>{completedCount} tes selesai</span>
            <span>·</span>
            <span>Bergabung {new Date(dbUser.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base flex items-center gap-2">
            <User size={16} className="text-primary" />
            Edit Informasi Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <form action={updateProfile} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Lengkap</Label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  id="name"
                  name="name"
                  defaultValue={dbUser.name}
                  required
                  className="pl-9"
                  placeholder="Nama lengkap kamu"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  value={dbUser.email}
                  disabled
                  className="pl-9 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-slate-400">Email tidak dapat diubah.</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="school" className="text-sm font-medium text-slate-700">Sekolah / Institusi</Label>
              <div className="relative">
                <School size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  id="school"
                  name="school"
                  defaultValue={dbUser.school}
                  className="pl-9"
                  placeholder="Nama sekolah kamu"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gender" className="text-sm font-medium text-slate-700">Jenis Kelamin</Label>
              <div className="relative">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  id="gender"
                  name="gender"
                  defaultValue={dbUser.gender}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full">Simpan Perubahan</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="shadow-sm border-red-100">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base text-red-600">Zona Berbahaya</CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <p className="text-sm text-slate-500 mb-4">
            Menghapus akun akan menghapus semua data termasuk riwayat tes dan analisis secara permanen.
          </p>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" disabled>
            Hapus Akun (Segera Hadir)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
