'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, School, Users, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { updateProfileAction } from '@/app/(protected)/profile/actions'

interface ProfileFormProps {
  user: {
    name: string
    email: string
    school: string | null
    gender: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await updateProfileAction(formData)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Profil berhasil diperbarui!')
    }
    
    setIsPending(false)
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="border-b py-5 bg-slate-50/50">
        <CardTitle className="text-base flex items-center gap-2 text-slate-800">
          <User size={18} className="text-[#0B3B60]" />
          Informasi Profil
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Nama Lengkap</Label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                id="name"
                name="name"
                defaultValue={user.name}
                required
                className="pl-10 border-slate-200 focus:ring-[#0B3B60]/30 transition-all"
                placeholder="Nama lengkap kamu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                value={user.email}
                disabled
                className="pl-10 bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200"
              />
            </div>
            <p className="text-xs text-slate-400 font-medium">Email ditautkan ke akun Google/Auth kamu dan tidak dapat diubah.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school" className="text-sm font-semibold text-slate-700">Sekolah / Institusi</Label>
            <div className="relative">
              <School size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                id="school"
                name="school"
                defaultValue={user.school || ''}
                className="pl-10 border-slate-200 focus:ring-[#0B3B60]/30 transition-all"
                placeholder="Nama sekolah kamu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-semibold text-slate-700">Jenis Kelamin</Label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                id="gender"
                name="gender"
                defaultValue={user.gender || ''}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B3B60]/30 transition-all"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full sm:w-auto px-8 bg-[#0B3B60] hover:bg-[#072a44] text-white transition-colors"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
