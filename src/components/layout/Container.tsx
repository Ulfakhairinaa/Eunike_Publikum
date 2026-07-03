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
        // base safety layout
        'w-full min-w-0 mx-auto',
        'px-4 sm:px-6 lg:px-8',

        // max width control
        size === 'sm' && 'max-w-2xl',
        size === 'md' && 'max-w-4xl',
        size === 'lg' && 'max-w-6xl',
        size === 'full' && 'max-w-none',

        // penting untuk menghindari horizontal scroll dari child
        'overflow-x-hidden',

        className
      )}
      {...props}
    />
  )
)

Container.displayName = 'Container'