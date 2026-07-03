import React from 'react'
import clsx from 'clsx'
import { Menu } from 'lucide-react'

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  onMenuClick?: () => void
}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, onMenuClick, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={clsx(
        'bg-white border-b border-secondary-200 sticky top-0 z-50',
        'h-16 px-4 flex items-center justify-between',
        className
      )}
      {...props}
    >
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={onMenuClick}
        className="lg:hidden flex items-center justify-center"
      >
        <Menu size={22} />
      </button>

      {/* CONTENT SLOT (optional title/logo) */}
      <div className="flex-1 flex items-center">
        {children}
      </div>

      {/* SPACER (desktop alignment) */}
      <div className="hidden lg:block w-6" />
    </nav>
  )
)

Navbar.displayName = 'Navbar'