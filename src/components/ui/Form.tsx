import React from 'react'
import { Button } from './button'
import { Input } from './input'
import clsx from 'clsx'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: 'vertical' | 'horizontal'
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, layout = 'vertical', ...props }, ref) => (
    <form ref={ref} className={clsx('space-y-4', className)} {...props} />
  )
)
Form.displayName = 'Form'

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('space-y-2', className)} {...props} />
  )
)
FormGroup.displayName = 'FormGroup'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, icon, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-secondary-800 mb-2">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-500 pointer-events-none">
            {icon}
          </span>
        )}
        <select
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 border-2 border-secondary-300 rounded-lg',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            error && 'border-danger focus:border-danger focus:ring-red-100',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
)
Select.displayName = 'Select'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => (
    <label className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          'w-4 h-4 accent-primary-500 cursor-pointer',
          className
        )}
        {...props}
      />
      {label && <span className="text-secondary-700">{label}</span>}
    </label>
  )
)
Checkbox.displayName = 'Checkbox'
