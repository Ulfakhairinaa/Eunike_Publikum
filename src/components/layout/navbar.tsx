'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, ClipboardList, BarChart2, BookOpen, LogOut, Menu, X, Lock } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type NavLink = {
  href: string
  label: string
  icon: React.ElementType
  requiresTest?: boolean
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/test', label: 'Mulai Tes', icon: ClipboardList },
  { href: '/hasil-analisis', label: 'Hasil Analisis', icon: BarChart2, requiresTest: true },
  { href: '/rekomendasi-jurusan', label: 'Rekomendasi Jurusan', icon: BookOpen, requiresTest: true },
]

interface NavbarProps {
  userName?: string | null
  hasCompletedTest?: boolean
}

export default function Navbar({ userName, hasCompletedTest = false }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
    if (link.requiresTest && !hasCompletedTest) {
      e.preventDefault()
      toast.error('Harus ikut Test dulu', {
        description: 'Selesaikan tes RIASEC & DAT terlebih dahulu untuk mengakses halaman ini.',
        duration: 4000,
        action: {
          label: 'Mulai Tes',
          onClick: () => router.push('/test'),
        },
      })
      setMobileOpen(false)
      return
    }
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-black text-primary tracking-tight">YO-MAP</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon, requiresTest }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              const isLocked = requiresTest && !hasCompletedTest

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, { href, label, icon: Icon, requiresTest })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : isLocked
                        ? 'text-slate-400 hover:text-slate-500 cursor-pointer'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
                  }`}
                >
                  {isLocked ? <Lock size={14} className="opacity-60" /> : <Icon size={16} />}
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Right side: user + logout */}
          <div className="hidden md:flex items-center gap-3">
            {userName && (
              <span className="text-sm text-slate-500 font-medium">
                👋 {userName}
              </span>
            )}
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="text-slate-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-1.5"
              >
                <LogOut size={16} />
                Keluar
              </Button>
            </form>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const { href, label, icon: Icon, requiresTest } = link
            const isActive = pathname === href
            const isLocked = requiresTest && !hasCompletedTest

            return (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, link)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : isLocked
                      ? 'text-slate-400 cursor-pointer'
                      : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isLocked ? <Lock size={14} className="opacity-60" /> : <Icon size={16} />}
                {label}
                {isLocked && <span className="ml-auto text-xs bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Terkunci</span>}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-slate-100 mt-2">
            {userName && (
              <p className="text-xs text-slate-400 px-3 pb-1">Login sebagai <span className="font-semibold">{userName}</span></p>
            )}
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  )
}
