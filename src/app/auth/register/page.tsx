'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '../actions'
import { RegisterSection } from '@/components/sections'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(undefined)
    
    const result = await signup(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <RegisterSection
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  )
}
