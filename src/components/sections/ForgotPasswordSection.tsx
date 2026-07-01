'use client'

import React, { useState } from 'react'
import { Button, Input, Form, FormGroup, Alert } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, ArrowRight, ArrowLeft, Lock } from 'lucide-react'

interface ForgotPasswordSectionProps {
  onSubmit: (formData: FormData) => Promise<{ error?: string, success?: boolean }>
}

export const ForgotPasswordSection = ({ onSubmit }: ForgotPasswordSectionProps) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('Email wajib diisi')
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append('email', email)

    try {
      const res = await onSubmit(formData)
      if (res?.error) {
        setError(res.error)
      } else if (res?.success) {
        setSuccess(true)
      }
    } catch (err: any) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClassName = "bg-blue-50/30 border-blue-100 focus:border-blue-500 focus:ring-blue-100 text-slate-700"

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 text-center">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <Lock className="text-[#0B3B60]" size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lupa Kata Sandi?</h2>
        <p className="text-slate-500 text-sm mb-8">
          Jangan khawatir! Masukkan email yang terdaftar dan kami akan mengirimkan instruksi untuk mereset kata sandi Anda.
        </p>

        {error && <Alert type="error" message={error} className="mb-6 text-left" />}
        
        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-6 mb-6">
            <p className="font-semibold mb-2">Email Terkirim!</p>
            <p className="text-sm">Silakan periksa kotak masuk (atau folder spam) email Anda untuk instruksi lebih lanjut.</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="space-y-6 text-left">
            <FormGroup>
              <Input
                label="Email Anda"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                className={inputClassName}
              />
            </FormGroup>

            <Button
              type="submit"
              className="w-full bg-[#0B3B60] hover:bg-[#072a47] text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              isLoading={isLoading}
            >
              Kirim Link Reset <ArrowRight size={18} />
            </Button>
          </Form>
        )}

        <div className="mt-8">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0B3B60] font-medium transition-colors">
            <ArrowLeft size={16} /> Kembali ke halaman Login
          </Link>
        </div>
      </div>
    </div>
  )
}
