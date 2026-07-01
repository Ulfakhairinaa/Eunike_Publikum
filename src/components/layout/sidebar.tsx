'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { toast } from 'sonner'
import {
  LayoutDashboard, ClipboardList, BarChart2, BookOpen,
  GraduationCap, Briefcase, Gamepad2, History,
  User, LogOut, Lock
} from 'lucide-react'

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
  requiresTest?: boolean
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Beranda', icon: LayoutDashboard },
  { href: '/test', label: 'Tes Minat & Bakat', icon: ClipboardList },
  { href: '/hasil-analisis', label: 'Hasil Analisis', icon: BarChart2, requiresTest: true },
  { href: '/rekomendasi-jurusan', label: 'Rekomendasi Jurusan', icon: BookOpen, requiresTest: true },
  { href: '/detail-jurusan', label: 'Detail Jurusan', icon: GraduationCap, requiresTest: true },
  { href: '/prospek-karier', label: 'Prospek Karier', icon: Briefcase, requiresTest: true },
  { href: '/game-interaktif', label: 'Game Interaktif', icon: Gamepad2, requiresTest: true },
  { href: '/riwayat', label: 'Riwayat', icon: History },
  { href: '/profile', label: 'Profile', icon: User },
]

interface SidebarProps {
  userName?: string | null
  userSchool?: string | null
  hasCompletedTest?: boolean
}

export default function Sidebar({ userName, userSchool, hasCompletedTest = false }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

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

  return (
    <aside
      className="w-[240px] min-h-screen flex flex-col shrink-0"
      style={{ background: '#0A1628' }}
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="text-white font-black text-xl tracking-tight">YO MAP</div>
        <div className="text-slate-400 text-xs mt-0.5 tracking-wide">Career Platform</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const { href, label, icon: Icon, requiresTest } = item
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href + '/'))
          const isLocked = requiresTest && !hasCompletedTest

          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, item)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white/20 text-white'
                  : isLocked
                    ? 'text-slate-500 cursor-pointer'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {isLocked ? (
                <Lock size={15} className="opacity-40 shrink-0" />
              ) : (
                <Icon size={15} className="shrink-0" />
              )}
              <span className="truncate">{label}</span>
              {isLocked && (
                <span className="ml-auto shrink-0 text-[10px] bg-slate-700/70 text-slate-500 px-1.5 py-0.5 rounded">
                  🔒
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User info + Logout */}
      <div className="border-t border-white/10 px-3 py-4 space-y-1">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: '#1a4b8c' }}
          >
            {getInitials(userName)}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">{userName || 'User'}</div>
            <div className="text-slate-400 text-xs truncate">{userSchool || ''}</div>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={15} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  )
}
