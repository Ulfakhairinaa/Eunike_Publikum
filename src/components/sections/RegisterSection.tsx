'use client'

import React, { useState } from 'react'
import { Button, Input, Form, FormGroup, Alert, Select } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'
import { User, Mail, Lock, Eye, EyeOff, Building2, Users, ArrowRight, ArrowLeft } from 'lucide-react'

interface RegisterSectionProps {
  onSubmit: (formData: FormData) => Promise<void>
  isLoading?: boolean
  error?: string
}

export const RegisterSection = ({ onSubmit, isLoading = false, error }: RegisterSectionProps) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    school: '', 
    gender: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    const errors: Record<string, string> = {}
    if (!formData.name) errors.name = 'Nama lengkap wajib diisi'
    if (!formData.school) errors.school = 'Asal sekolah wajib diisi'
    if (!formData.gender) errors.gender = 'Jenis kelamin wajib diisi'
    if (!formData.email) errors.email = 'Email wajib diisi'
    if (!formData.password) errors.password = 'Password wajib diisi'
    else if (formData.password.length < 6) errors.password = 'Password minimal 6 karakter'
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Password tidak cocok'
    }
    
    if (!agreeTerms) {
      errors.agree = 'Anda harus menyetujui Syarat & Ketentuan'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const data = new FormData()
    data.append('name', formData.name)
    data.append('school', formData.school)
    data.append('gender', formData.gender)
    data.append('email', formData.email)
    data.append('password', formData.password)
    data.append('confirmPassword', formData.confirmPassword)

    try {
      await onSubmit(data)
    } catch (err: any) {
    }
  }

  const inputClassName = "bg-blue-50/30 border-blue-100 focus:border-blue-500 focus:ring-blue-100 text-slate-700"

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Kolom Kiri: Biru dengan Gambar */}
      <div className="w-full md:w-[45%] bg-[#0B3B60] flex flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Latar Belakang Dot/Grid halus opsional (seperti contoh sebelumnya, tapi dibiarkan polos sesuai mockup) */}
        
        <div className="relative z-10 flex flex-col items-center max-w-md text-center">
          {/* Logo Topi Wisuda */}
          <div className="mb-4">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image 
                src="/images/logo-wisuda.png" 
                alt="Logo Wisuda" 
                fill 
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-10 tracking-tight">YO-MAP</h1>
          
          {/* Gambar Siswa */}
          <div className="bg-white rounded-2xl p-4 shadow-2xl mb-8 w-full relative">
            <div className="aspect-[16/9] relative rounded-xl overflow-hidden">
              <Image 
                src="/images/register-students.png" 
                alt="Siswa" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <p className="text-blue-50/90 text-sm md:text-base leading-relaxed">
            Temukan Jurusan, Rancang Masa Depanmu. Mulai perjalanan karirmu dengan sistem analisis bakat paling komprehensif.
          </p>
        </div>
      </div>

      {/* Kolom Kanan: Form Registrasi */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-6 py-12 md:p-12 bg-slate-50/50">
        <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0B3B60] transition-colors font-medium mb-6">
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Buat Akun Baru</h2>
            <p className="text-slate-500 text-sm">Lengkapi data diri Anda untuk memulai eksplorasi karir.</p>
          </div>

          {error && <Alert type="error" message={error} className="mb-6" />}
          {formErrors.agree && <Alert type="error" message={formErrors.agree} className="mb-6" />}

          <Form onSubmit={handleSubmit} className="space-y-5">
            <FormGroup>
              <Input
                label="Nama Lengkap"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={formErrors.name}
                icon={<User size={18} />}
                className={inputClassName}
              />
            </FormGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup>
                <Input
                  label="Asal Sekolah"
                  type="text"
                  placeholder="SMAN 1..."
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  error={formErrors.school}
                  icon={<Building2 size={18} />}
                  className={inputClassName}
                />
              </FormGroup>

              <FormGroup>
                <Select
                  label="Jenis Kelamin"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  error={formErrors.gender}
                  icon={<Users size={18} />}
                  className={inputClassName}
                >
                  <option value="">Pilih...</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Select>
              </FormGroup>
            </div>

            <FormGroup>
              <Input
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={formErrors.email}
                icon={<Mail size={18} />}
                className={inputClassName}
              />
            </FormGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup>
                <div className="relative">
                  <Input
                    label="Kata Sandi"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    error={formErrors.password}
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
                    label="Konfirmasi Sandi"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    error={formErrors.confirmPassword}
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
            </div>

            <div className="flex items-start gap-3 py-2">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0B3B60] focus:ring-[#0B3B60]"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                Saya menyetujui <Link href="#" className="text-[#0B3B60] font-semibold hover:underline">Syarat & Ketentuan</Link> serta <Link href="#" className="text-[#0B3B60] font-semibold hover:underline">Kebijakan Privasi</Link> yang berlaku.
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0B3B60] hover:bg-[#072a47] text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              isLoading={isLoading}
            >
              Daftar Sekarang <ArrowRight size={18} />
            </Button>
          </Form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative bg-white px-4 text-xs text-slate-400 uppercase tracking-widest">
              atau daftar dengan
            </div>
          </div>

          <div className="mt-8">
            <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>

          <p className="text-center text-slate-600 text-sm mt-8">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-[#0B3B60] font-bold hover:underline">
              Masuk Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
