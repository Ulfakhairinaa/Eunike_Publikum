'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Home, FileCheck, FileText,
  GraduationCap, Info, Briefcase, Gamepad2, History,
  User, LogOut, Lock, Menu, X
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

export default function Sidebar({
  userName = '',
  userSchool = '',
  hasCompletedTest = false
}: SidebarProps) {

  const pathname = usePathname()
  const router = useRouter()

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

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
    } else {
      setIsOpen(false) // close drawer on mobile click
    }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  let activeIndex = navItems.findIndex(item =>
    pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'))
  )
  if (activeIndex === -1) activeIndex = 0

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm z-30 flex items-center px-4">
        <button onClick={() => setIsOpen(true)} className="mr-3">
          <Menu />
        </button>
        <div className="font-bold text-[#0B3B60]">YO MAP</div>
      </div>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      {/*
        - "fixed" di mobile: drawer melayang di atas konten.
        - "lg:sticky lg:top-0" di desktop: sidebar tetap mengisi penuh
          dari atas sampai bawah viewport walau halaman di-scroll.
        - TIDAK ADA pt-16 lagi: karena drawer ini (z-50) selalu menutup
          total header mobile (z-30) saat dibuka, padding-top di sini
          cuma bikin ruang kosong percuma di atas logo. Tombol close
          sekarang digabung satu baris sama logo, bukan ngambang sendiri.
      */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0 lg:top-0
          z-50
          h-screen
          w-[260px]
          flex flex-col
          shrink-0
          shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        style={{ background: '#0B3B60' }}
      >

        {/* LOGO + CLOSE BUTTON (satu baris, sejajar) */}
        <div className="px-5 py-6 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Image
                src="/images/logo-wisuda.png"
                alt="Logo"
                width={28}
                height={28}
                className="object-contain shrink-0"
              />
              <div className="text-white font-black text-lg lg:text-xl tracking-tight truncate">
                YO MAP
              </div>
            </div>
            <div className="text-slate-300 text-xs font-medium tracking-wide truncate">
              Youth Career Mapping
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white shrink-0 p-1 -mr-1"
            aria-label="Tutup menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto relative">

          {/*
            Highlight box indikator menu aktif.
            Jarak antar item = tinggi item (h-11 = 44px) + gap (space-y-1 = 4px) = 48px.
            +2px di akhir untuk center-kan box (h-10=40px) di dalam row (h-11=44px).
          */}
          {activeIndex !== -1 && (
            <div
              className="absolute left-3 right-3 h-10 bg-white/20 rounded-lg transition-transform duration-300 pointer-events-none"
              style={{ transform: `translateY(${activeIndex * 48 + 2}px)` }}
            />
          )}

          <div className="space-y-1 relative z-10">
            {navItems.map((item) => {
              const { href, label, icon: Icon, requiresTest } = item

              const isActive =
                pathname === href ||
                (href !== '/dashboard' && pathname.startsWith(href + '/'))

              const isLocked = requiresTest && !hasCompletedTest

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : isLocked
                        ? 'text-slate-400/50'
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
                    <span className="ml-auto text-[10px] bg-slate-700/50 text-slate-400 px-1.5 py-0.5 rounded">
                      🔒
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* BOTTOM */}
        <div className="border-t border-white/10 px-3 py-4 space-y-1 mt-auto">

          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 h-11 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
            onClick={() => setIsOpen(false)}
          >
            <User size={18} />
            Profile
          </Link>

          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex items-center gap-3 w-full px-3 h-11 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
          >
            <LogOut size={18} />
            Logout
          </button>

          {/* USER */}
          <div className="flex items-center gap-3 px-2 py-3 mt-2 rounded-lg bg-black/20">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold bg-blue-500">
              {getInitials(userName)}
            </div>

            <div className="overflow-hidden flex-1 min-w-0">
              <div className="text-white text-sm font-bold truncate">
                {userName || 'User'}
              </div>
              <div className="text-slate-400 text-xs truncate">
                {userSchool || 'Siswa SMA'}
              </div>
            </div>
          </div>

        </div>

        {/* LOGOUT DIALOG */}
        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Konfirmasi Keluar</DialogTitle>
              <DialogDescription>
                Apakah kamu yakin ingin keluar?
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
                Batal
              </Button>

              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-red-50 text-red-600"
              >
                {isLoggingOut ? 'Keluar...' : 'Keluar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </aside>
    </>
  )
}