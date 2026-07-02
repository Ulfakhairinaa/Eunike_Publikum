'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { toast } from 'sonner'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Home, FileCheck, FileText,
  GraduationCap, Info, Briefcase, FlaskConical, Gamepad2, History,
  User, LogOut, Lock
} from 'lucide-react'

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
  requiresTest?: boolean
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Beranda', icon: Home },
  { href: '/test', label: 'Tes Minat & Bakat', icon: FileCheck },
  { href: '/hasil-analisis', label: 'Hasil Analisis', icon: FileText, requiresTest: true },
  { href: '/rekomendasi-jurusan', label: 'Rekomendasi Jurusan', icon: GraduationCap, requiresTest: true },
  { href: '/detail-jurusan', label: 'Detail Jurusan', icon: Info, requiresTest: true },
  { href: '/prospek-karier', label: 'Prospek Karier', icon: Briefcase, requiresTest: true },
  { href: '/game-interaktif', label: 'Kompas Masa Depan', icon: Gamepad2, requiresTest: true },
  { href: '/riwayat', label: 'Riwayat', icon: History },
]

interface SidebarProps {
  userName?: string
  userSchool?: string
  hasCompletedTest?: boolean
}

export default function Sidebar({ userName = '', userSchool = '', hasCompletedTest = false }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
  }

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.requiresTest && !hasCompletedTest) {
      e.preventDefault()
      toast.error('Harus ikut Test dulu', {
        description: 'Selesaikan tes RIASEC & DAT terlebih dahulu untuk mengakses halaman ini.',
        duration: 4000,
        action: {
          label: 'Mulai Tes',
          onClick: () => router.push('/test'),
        },
      })
    }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  // Find active index for the sliding pill
  let activeIndex = navItems.findIndex(item => 
    pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'))
  )
  if (activeIndex === -1) activeIndex = 0 // default to 0 if not found, though it shouldn't be visible

  return (
    <aside
      className="w-[260px] min-h-screen flex flex-col shrink-0"
      style={{ background: '#0B3B60' }}
    >
      {/* Logo & Header */}
      <div className="px-5 py-6 border-b border-white/10 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          <Image 
            src="/images/logo-wisuda.png" 
            alt="Logo" 
            width={28} 
            height={28} 
            className="object-contain" 
          />
          <div className="text-white font-black text-xl tracking-tight">YO MAP</div>
        </div>
        <div className="text-slate-300 text-xs font-medium tracking-wide">
          Youth Career Mappingform
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto relative">
        {/* The sliding active pill (Animasi shape hover) */}
        {activeIndex !== -1 && (
          <div 
            className="absolute left-3 right-3 h-10 bg-white/20 rounded-lg transition-transform duration-300 ease-in-out pointer-events-none"
            style={{ transform: `translateY(${activeIndex * 44}px)` }}
          />
        )}

        <div className="space-y-1 relative z-10">
          {navItems.map((item) => {
            const { href, label, icon: Icon, requiresTest } = item
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href + '/'))
            const isLocked = requiresTest && !hasCompletedTest

            return (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : isLocked
                      ? 'text-slate-400/50 cursor-pointer'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isLocked ? (
                  <Lock size={18} className="opacity-40 shrink-0" />
                ) : (
                  <Icon size={18} className="shrink-0" />
                )}
                <span className="truncate">{label}</span>
                {isLocked && (
                  <span className="ml-auto shrink-0 text-[10px] bg-slate-700/50 text-slate-400 px-1.5 py-0.5 rounded">
                    🔒
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Profile & Logout */}
      <div className="border-t border-white/10 px-3 py-4 space-y-1 mt-auto">
        <Link href="/profile" className="flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
          <User size={18} className="shrink-0" />
          <span>Profile</span>
        </Link>
        <button
          onClick={() => setIsLogoutDialogOpen(true)}
          className="flex items-center gap-3 w-full px-3 h-10 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Logout</span>
        </button>

        {/* Dialog Konfirmasi Logout */}
        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-800">
                <LogOut size={20} className="text-slate-600" />
                Konfirmasi Keluar
              </DialogTitle>
              <DialogDescription className="pt-2 text-slate-600">
                Apakah kamu yakin ingin keluar dari akunmu saat ini? Kamu harus login kembali untuk mengakses Yomap.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 pt-4 border-t mt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsLogoutDialogOpen(false)}
                disabled={isLoggingOut}
                className="text-slate-600"
              >
                Batal
              </Button>
              <Button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-transparent hover:border-red-200 transition-colors"
              >
                {isLoggingOut ? 'Keluar...' : 'Ya, Keluar Akun'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* User Card at the very bottom */}
        <div className="flex items-center gap-3 px-2 py-3 mt-2 rounded-lg bg-black/20">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 bg-blue-500"
          >
            {getInitials(userName)}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <div className="text-white text-sm font-bold truncate">{userName || 'User'}</div>
            <div className="text-slate-400 text-xs truncate">{userSchool || 'Siswa SMA'}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
