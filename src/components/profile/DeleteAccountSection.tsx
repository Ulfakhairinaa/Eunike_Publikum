'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { deleteAccountAction } from '@/app/(protected)/profile/actions'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function DeleteAccountSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteAccountAction()
    
    if (result.error) {
      toast.error(result.error)
      setIsDeleting(false)
    } else {
      toast.success('Akun berhasil dihapus secara permanen.')
      
      // Sign out from supabase
      const supabase = createClient()
      await supabase.auth.signOut()
      
      router.push('/auth/login')
      router.refresh()
    }
  }

  return (
    <>
      <Card className="shadow-sm border-red-200">
        <CardHeader className="border-b border-red-100 py-4 bg-red-50/50">
          <CardTitle className="text-base flex items-center gap-2 text-red-700">
            <AlertTriangle size={18} />
            Zona Berbahaya
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Tindakan ini tidak dapat dibatalkan. Menghapus akun akan <strong>menghapus semua data kamu</strong> termasuk profil, riwayat tes, dan hasil analisis minat bakat secara permanen dari sistem kami.
          </p>
          <Button 
            variant="outline" 
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 font-medium transition-colors"
            onClick={() => setIsOpen(true)}
          >
            Hapus Akun Saya
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle size={20} />
              Konfirmasi Hapus Akun
            </DialogTitle>
            <DialogDescription className="pt-3 text-slate-600">
              Apakah kamu yakin ingin menghapus akun secara permanen? Seluruh riwayat tes dan datamu akan hilang. Tindakan ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4 border-t mt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
              className="text-slate-600"
            >
              Batal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700 hover:text-white"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Ya, Hapus Permanen'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
