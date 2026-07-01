import clsx from 'clsx'
import React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect'
  count?: number
}

export const Skeleton = ({ variant = 'rect', count = 1, className, ...props }: SkeletonProps) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'bg-secondary-200 animate-pulse rounded',
            variant === 'circle' && 'rounded-full w-12 h-12',
            variant === 'text' && 'h-4 mb-3',
            variant === 'rect' && 'h-24 mb-4',
            className
          )}
          {...props}
        />
      ))}
    </div>
  )
}
