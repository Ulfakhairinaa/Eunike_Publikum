import { colors } from '@/lib/tokens/colors'
import { components } from '@/lib/tokens/components'
import clsx from 'clsx'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-800 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-500">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 border-2 rounded-lg',
            'border-secondary-300 text-secondary-900',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            'transition-all',
            'placeholder:text-secondary-400',
            error && 'border-danger focus:border-danger focus:ring-red-100',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-secondary-500 text-sm mt-1">{helperText}</p>}
    </div>
  )
)

Input.displayName = 'Input'
