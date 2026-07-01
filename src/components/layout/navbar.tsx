import React from 'react'
import clsx from 'clsx'

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={clsx(
        'bg-white border-b border-secondary-200 sticky top-0 z-50',
        'h-16 px-6', 
        className
      )}
      {...props}
    />
  )
)
Navbar.displayName = 'Navbar'
