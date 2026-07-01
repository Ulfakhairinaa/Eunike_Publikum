import React from 'react'
import clsx from 'clsx'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'mx-auto px-4',  
        size === 'sm' && 'max-w-2xl',
        size === 'md' && 'max-w-4xl',
        size === 'lg' && 'max-w-6xl',
        size === 'full' && 'w-full',
        className
      )}
      {...props}
    />
  )
)
Container.displayName = 'Container'
