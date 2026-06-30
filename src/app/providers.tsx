'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          classNames: {
            error: 'bg-red-50 border border-red-200 text-red-800',
          }
        }}
      />
    </QueryClientProvider>
  )
}
