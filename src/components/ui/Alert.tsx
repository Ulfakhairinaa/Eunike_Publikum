import clsx from 'clsx'
import React from 'react'
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: AlertType
  title?: string
  message: string
}

const alertConfig = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: CheckCircle,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: XCircle,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: AlertCircle,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: Info,
  },
}

export const Alert = ({ type, title, message, className, ...props }: AlertProps) => {
  const config = alertConfig[type]
  const Icon = config.icon

  return (
    <div
      className={clsx(config.bg, config.border, 'border px-4 py-4 rounded-lg', className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        <Icon className={clsx(config.text, 'w-5 h-5 flex-shrink-0 mt-0.5')} />
        <div className="flex-1">
          {title && <h4 className={clsx(config.text, 'font-semibold')}>{title}</h4>}
          <p className={clsx(config.text, 'text-sm')}>{message}</p>
        </div>
      </div>
    </div>
  )
}
