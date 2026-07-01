'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../actions'
import { LoginSection } from '@/components/sections'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true)
    setError(undefined)
    
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <LoginSection
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  )
}
