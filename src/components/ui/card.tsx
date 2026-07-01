import clsx from 'clsx'
import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, shadow = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'rounded-xl bg-white p-6', // matches figma card radius 12px, padding 24px
        'border border-secondary-200',
        shadow === 'sm' && 'shadow-sm',
        shadow === 'md' && 'shadow-md',
        shadow === 'lg' && 'shadow-lg',
        'hover:shadow-lg transition-shadow',
        className
      )}
      {...props}
    />
  )
)

Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('mb-4 pb-4 border-b border-secondary-200', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={clsx('text-2xl font-bold text-secondary-900', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />
)
CardContent.displayName = 'CardContent'

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={clsx('text-sm text-secondary-500', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'
