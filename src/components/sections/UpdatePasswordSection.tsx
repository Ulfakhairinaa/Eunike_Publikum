'use client'

import React, { useState } from 'react'
import { Button, Input, Form, FormGroup, Alert } from '@/components/ui'
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

interface UpdatePasswordSectionProps {
  onSubmit: (formData: FormData) => Promise<{ error?: string }>
}

export const UpdatePasswordSection = ({ onSubmit }: UpdatePasswordSectionProps) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!password) {
      setError('Kata sandi baru wajib diisi')
      return
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter')
      return
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok')
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append('password', password)

    try {
      const res = await onSubmit(formData)
      if (res?.error) {
        setError(res.error)
      }
      // If success, it redirects to login page inside the server action
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

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Buat Kata Sandi Baru</h2>
        <p className="text-slate-500 text-sm mb-8">
          Silakan masukkan kata sandi baru Anda di bawah ini. Pastikan untuk mengingatnya!
        </p>

        {error && <Alert type="error" message={error} className="mb-6 text-left" />}
        
        <Form onSubmit={handleSubmit} className="space-y-6 text-left">
          <FormGroup>
            <div className="relative">
              <Input
                label="Kata Sandi Baru"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                className={inputClassName}
              />
              <button 
                type="button" 
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormGroup>

          <FormGroup>
            <div className="relative">
              <Input
                label="Konfirmasi Kata Sandi"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock size={18} />}
                className={inputClassName}
              />
              <button 
                type="button" 
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormGroup>

          <Button
            type="submit"
            className="w-full bg-[#0B3B60] hover:bg-[#072a47] text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mt-2"
            isLoading={isLoading}
          >
            Simpan Kata Sandi <ArrowRight size={18} />
          </Button>
        </Form>
      </div>
    </div>
  )
}
