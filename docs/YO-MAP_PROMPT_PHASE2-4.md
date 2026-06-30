# YO MAP PHASE 2-4: AUTH → QUIZ → REKOMENDASI
**Durasi: 1 jam per phase | Priority: HIGH**

---

## ⚡ PHASE 2: AUTH PAGES & LOGIC
**Durasi: 1-2 jam**

Sebelum mulai: Pastikan PHASE 1 sudah selesai dan verified ✅

### TUGAS 2.1: Setup Auth Context (Client-side)

File: `app/(auth)/context/AuthContext.tsx`

```typescript
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@/types'

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nama: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        // Fetch full user profile dari database
        setUser({
          id: authUser.id,
          email: authUser.email!,
          nama_lengkap: authUser.user_metadata?.nama_lengkap || '',
          status_verifikasi: 'unverified',
          created_at: authUser.created_at || new Date().toISOString(),
          updated_at: authUser.updated_at || new Date().toISOString(),
        })
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (authUser) {
      setUser({
        id: authUser.id,
        email: authUser.email!,
        nama_lengkap: authUser.user_metadata?.nama_lengkap || '',
        status_verifikasi: 'unverified',
        created_at: authUser.created_at || new Date().toISOString(),
        updated_at: authUser.updated_at || new Date().toISOString(),
      })
    }
  }

  const register = async (email: string, password: string, nama: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nama_lengkap: nama },
      },
    })
    if (error) throw error
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

### TUGAS 2.2: Setup Protected Routes Middleware

File: `middleware.ts` (root project)

```typescript
import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('sb-access-token')

  // Routes yang butuh auth
  const protectedPaths = ['/dashboard', '/quiz', '/hasil-analisis', '/rekomendasi-jurusan']
  
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Kalau ke protected route tapi tidak ada token, redirect ke login
  if (isProtectedPath && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Kalau ke login/register tapi sudah ada token, redirect ke dashboard
  if ((request.nextUrl.pathname.startsWith('/login') || 
       request.nextUrl.pathname.startsWith('/register')) && 
      authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

### TUGAS 2.3: Login Page

File: `app/(auth)/login/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Email dan password wajib diisi')
      }

      if (!formData.email.includes('@')) {
        throw new Error('Format email tidak valid')
      }

      await login(formData.email, formData.password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">YO MAP</h1>
        <p className="text-center text-gray-600 mb-8">Masuk ke akun Anda</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  )
}
```

### TUGAS 2.4: Register Page

File: `app/(auth)/register/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    namaLengkap: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validasi
      if (!formData.email || !formData.password || !formData.namaLengkap) {
        throw new Error('Semua field wajib diisi')
      }

      if (!formData.email.includes('@')) {
        throw new Error('Format email tidak valid')
      }

      if (formData.password.length < 8) {
        throw new Error('Password minimal 8 karakter')
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Password tidak cocok')
      }

      await register(formData.email, formData.password, formData.namaLengkap)
      
      // Auto login setelah register
      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'Register gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">YO MAP</h1>
        <p className="text-center text-gray-600 mb-8">Buat akun baru</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Anda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Sudah punya akun? <Link href="/login" className="text-blue-600 hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  )
}
```

### TUGAS 2.5: Auth Layout

File: `app/(auth)/layout.tsx`

```typescript
import { AuthProvider } from './context/AuthContext'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
```

### PHASE 2 VERIFICATION

Test login/register:
- [ ] Register dengan email baru
- [ ] Login dengan email & password
- [ ] Error message muncul kalau field kosong
- [ ] Redirect ke dashboard setelah login berhasil
- [ ] Password validation berfungsi (minimal 8 karakter)

---

## ⚡ PHASE 3: QUIZ CORE FLOW
**Durasi: 2-3 jam**

### TUGAS 3.1: Setup Database dengan Quiz Sample Data

File: `app/api/seed/route.ts` (untuk populate sample data)

```typescript
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Create sample quiz
    const quiz = await prisma.quiz.create({
      data: {
        judul: 'Tes Minat Bakat - Tipe Holland',
        deskripsi: 'Tes untuk mengetahui tipe minat Anda berdasarkan teori Holland',
        kategori: 'minat',
        total_pertanyaan: 36,
        waktu_menit: 15,
        pertanyaan: {
          create: [
            {
              urutan: 1,
              pertanyaan_text: 'Saya menyukai pekerjaan yang melibatkan kerja tim dan interaksi sosial',
              tipe: 'single_choice',
              opsi_jawaban: {
                create: [
                  { teks: 'Sangat Setuju', nilai_skor: 3 },
                  { teks: 'Setuju', nilai_skor: 2 },
                  { teks: 'Netral', nilai_skor: 1 },
                  { teks: 'Tidak Setuju', nilai_skor: 0 },
                ],
              },
            },
            // Tambah pertanyaan lainnya...
          ],
        },
      },
      include: {
        pertanyaan: {
          include: {
            opsi_jawaban: true,
          },
        },
      },
    })

    return NextResponse.json({ 
      message: 'Sample data created successfully',
      quiz 
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
```

Jalankan: `curl http://localhost:3000/api/seed` atau buka di browser

### TUGAS 3.2: Quiz API Routes

File: `app/api/quiz/route.ts`

```typescript
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const quizzes = await prisma.quiz.findMany({
      select: {
        id: true,
        judul: true,
        deskripsi: true,
        kategori: true,
        total_pertanyaan: true,
        waktu_menit: true,
        created_at: true,
      },
    })

    return NextResponse.json(quizzes)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
```

File: `app/api/quiz/[id]/route.ts`

```typescript
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
      include: {
        pertanyaan: {
          include: {
            opsi_jawaban: true,
          },
          orderBy: { urutan: 'asc' },
        },
      },
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    return NextResponse.json(quiz)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
```

### TUGAS 3.3: Submit Quiz Answers

File: `app/api/quiz/submit/route.ts`

```typescript
import { prisma } from '@/lib/prisma'
import { supabaseServer } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get user dari auth
    const { data: { user } } = await supabaseServer.auth.admin.getUserById(
      request.headers.get('x-user-id') || ''
    )

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { quiz_id, answers } = await request.json()

    // Validate quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id: quiz_id },
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    // Save answers
    let totalScore = 0
    for (const { pertanyaan_id, opsi_jawaban_id } of answers) {
      const opsi = await prisma.opsiJawaban.findUnique({
        where: { id: opsi_jawaban_id },
      })

      if (opsi) {
        totalScore += opsi.nilai_skor

        await prisma.jawabQuiz.create({
          data: {
            user_id: user.id,
            quiz_id,
            opsi_jawaban_id,
            nilai_skor: opsi.nilai_skor,
          },
        })
      }
    }

    // Calculate result
    const maxScore = quiz.total_pertanyaan * 3 // Max 3 poin per pertanyaan
    const persentase = (totalScore / maxScore) * 100

    // Determine category
    let kategori_hasil = 'Belum Ditentukan'
    if (persentase >= 80) kategori_hasil = 'Tipe Sosial'
    else if (persentase >= 60) kategori_hasil = 'Tipe Investigatif'
    else kategori_hasil = 'Tipe Realis'

    // Save result
    const hasil = await prisma.hasilAnalisis.create({
      data: {
        user_id: user.id,
        quiz_id,
        total_skor: totalScore,
        persentase,
        kategori_hasil,
        interpretasi: `Berdasarkan hasil tes Anda, tipe minat Anda adalah ${kategori_hasil}. Ini menunjukkan bahwa Anda lebih tertarik pada pekerjaan yang...`,
      },
    })

    return NextResponse.json(hasil)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
```

### TUGAS 3.4: Dashboard Page

File: `app/(app)/dashboard/page.tsx`

```typescript
'use client'

import { useAuth } from '@/app/(auth)/context/AuthContext'
import { useQuizList } from '@/lib/queries'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { data: quizzes, isLoading } = useQuizList()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Selamat datang, {user?.nama_lengkap}!
          </h1>
          <p className="text-gray-600 mt-2">
            Pilih salah satu tes di bawah untuk memulai
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes?.map((quiz: any) => (
              <Link
                key={quiz.id}
                href={`/quiz/${quiz.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {quiz.judul}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {quiz.deskripsi}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{quiz.total_pertanyaan} pertanyaan</span>
                  <span>{quiz.waktu_menit} menit</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

### TUGAS 3.5: Quiz Detail Page (Pertanyaan)

File: `app/(app)/quiz/[id]/page.tsx`

```typescript
'use client'

import { useQuizDetail, useSubmitQuizAnswers } from '@/lib/queries'
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'

export default function QuizDetailPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.id as string

  const { data: quiz, isLoading } = useQuizDetail(quizId)
  const { mutate: submitQuiz, isPending } = useSubmitQuizAnswers()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentQuestion = quiz?.pertanyaan?.[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz?.pertanyaan?.length || 0) * 100

  const handleSelectAnswer = (opsiId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: opsiId,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.pertanyaan.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([pertanyaan_id, opsi_jawaban_id]) => ({
      pertanyaan_id,
      opsi_jawaban_id,
    }))

    submitQuiz({ quiz_id: quizId, answers: formattedAnswers }, {
      onSuccess: () => {
        router.push(`/hasil-analisis?quiz_id=${quizId}`)
      },
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (!quiz || !currentQuestion) return <div>Quiz not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pertanyaan {currentQuestionIndex + 1} dari {quiz.pertanyaan.length}
            </span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {currentQuestion.pertanyaan_text}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.opsi_jawaban.map((opsi: any) => (
              <label
                key={opsi.id}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition"
              >
                <input
                  type="radio"
                  name="answer"
                  value={opsi.id}
                  checked={answers[currentQuestion.id] === opsi.id}
                  onChange={() => handleSelectAnswer(opsi.id)}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="ml-4 text-gray-700">{opsi.teks}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Sebelumnya
          </button>

          {currentQuestionIndex === quiz.pertanyaan.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isPending || Object.keys(answers).length < quiz.pertanyaan.length}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isPending ? 'Mengirim...' : 'Selesaikan'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Selanjutnya
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
```

### FASE 3 VERIFICATION
- [ ] Dashboard muncul dengan list quiz
- [ ] Bisa klik quiz dan masuk ke halaman pertanyaan
- [ ] Pertanyaan + opsi jawaban tampil dengan benar
- [ ] Progress bar berjalan
- [ ] Tidak bisa lanjut kalau belum pilih jawaban
- [ ] Submit berhasil dan redirect ke hasil

---

## ⚡ PHASE 4: HASIL ANALISIS & REKOMENDASI JURUSAN
**Durasi: 1-2 jam**

### TUGAS 4.1: API Hasil Analisis

File: `app/api/hasil-analisis/route.ts`

```typescript
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const quizId = request.nextUrl.searchParams.get('quizId')

    if (!userId || !quizId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    const hasil = await prisma.hasilAnalisis.findUnique({
      where: {
        user_id_quiz_id: {
          user_id: userId,
          quiz_id: quizId,
        },
      },
    })

    if (!hasil) {
      return NextResponse.json({ error: 'Hasil not found' }, { status: 404 })
    }

    return NextResponse.json(hasil)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
```

### TUGAS 4.2: Hasil Analisis Page

File: `app/(app)/hasil-analisis/page.tsx`

```typescript
'use client'

import { useAuth } from '@/app/(auth)/context/AuthContext'
import { useSearchParams, useRouter } from 'next/navigation'
import { useHasilAnalisis } from '@/lib/queries'
import { Navbar } from '@/components/layout/Navbar'
import Link from 'next/link'

export default function HasilAnalisisPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const quizId = searchParams.get('quiz_id')

  const { data: hasil, isLoading } = useHasilAnalisis(user?.id || '', quizId || '')

  if (isLoading) return <div>Loading...</div>

  if (!hasil) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <p>Hasil tidak ditemukan</p>
          <Link href="/dashboard">Kembali ke Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hasil Tes Anda
          </h1>

          {/* Score */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-1">Skor Total</p>
              <p className="text-3xl font-bold text-blue-600">{hasil.total_skor}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-1">Persentase</p>
              <p className="text-3xl font-bold text-green-600">{hasil.persentase.toFixed(1)}%</p>
            </div>
          </div>

          {/* Category Result */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Tipe Minat Anda: <span className="text-indigo-600">{hasil.kategori_hasil}</span>
            </h2>
            <p className="text-gray-700">{hasil.interpretasi}</p>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Link
              href={`/rekomendasi-jurusan?tipe=${hasil.kategori_hasil}`}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 font-medium"
            >
              Lihat Rekomendasi Jurusan
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg text-center hover:bg-gray-300 font-medium"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### TUGAS 4.3: Rekomendasi Jurusan API & Seed Data

File: `app/api/rekomendasi-jurusan/route.ts`

```typescript
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const tipe = request.nextUrl.searchParams.get('tipe')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    // Get recommended jurusan based on tipe
    const rekomendasi = await prisma.rekomendasiJurusan.findMany({
      where: {
        user_id: userId,
        jurusan: { tipe_minat: tipe || undefined },
      },
      include: { jurusan: true },
      orderBy: { skor_kompatibilitas: 'desc' },
    })

    return NextResponse.json(rekomendasi)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// Generate recommendations for user (call manually or via webhook)
export async function POST(request: NextRequest) {
  try {
    const { userId, hasilId } = await request.json()

    const hasil = await prisma.hasilAnalisis.findUnique({
      where: { id: hasilId },
    })

    if (!hasil) {
      return NextResponse.json({ error: 'Hasil not found' }, { status: 404 })
    }

    // Get all jurusan matching tipe
    const jurusans = await prisma.jurusan.findMany({
      where: { tipe_minat: hasil.kategori_hasil },
    })

    // Create recommendations
    for (const jurusan of jurusans) {
      const skor = (hasil.persentase / 100) * 100
      await prisma.rekomendasiJurusan.create({
        data: {
          user_id: userId,
          jurusan_id: jurusan.id,
          skor_kompatibilitas: skor,
          alasan: `Berdasarkan hasil tes Anda, jurusan ini cocok untuk tipe ${hasil.kategori_hasil}`,
        },
      })
    }

    return NextResponse.json({ message: 'Recommendations created' })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
```

### TUGAS 4.4: Rekomendasi Jurusan Page

File: `app/(app)/rekomendasi-jurusan/page.tsx`

```typescript
'use client'

import { useAuth } from '@/app/(auth)/context/AuthContext'
import { useRekomendasiJurusan } from '@/lib/queries'
import { Navbar } from '@/components/layout/Navbar'
import Link from 'next/link'

export default function RekomendasiJurusanPage() {
  const { user } = useAuth()
  const { data: rekomendasi, isLoading } = useRekomendasiJurusan(user?.id || '')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Rekomendasi Jurusan untuk Anda
        </h1>

        {isLoading ? (
          <div>Loading...</div>
        ) : rekomendasi?.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800">
              Belum ada rekomendasi. Selesaikan tes minat bakat terlebih dahulu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rekomendasi?.map((rec: any) => (
              <div key={rec.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {rec.jurusan.nama}
                  </h3>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {rec.skor_kompatibilitas.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {rec.jurusan.universitas}
                </p>

                <p className="text-gray-700 mb-4">
                  {rec.alasan}
                </p>

                <Link
                  href={`/detail-jurusan/${rec.jurusan.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Lihat Detail &rarr;
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

### TUGAS 4.5: Navbar Component

File: `components/layout/Navbar.tsx`

```typescript
'use client'

import { useAuth } from '@/app/(auth)/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          YO MAP
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/hasil-analisis" className="text-gray-600 hover:text-gray-900">
            Hasil
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.nama_lengkap}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

### PHASE 4 VERIFICATION
- [ ] Hasil analisis tampil dengan score dan tipe minat
- [ ] Rekomendasi jurusan tampil berdasarkan tipe
- [ ] Score compatibility ditampilkan
- [ ] Navbar ada di semua halaman
- [ ] Logout berfungsi

---

## NEXT STEPS SETELAH PHASE 4

Jika sudah selesai Phase 1-4 dan ada sisa waktu:
- [ ] **PHASE 5**: Tambah halaman Detail Jurusan, Prospek Karir
- [ ] **Polish UI**: Desain landing page, improve CSS
- [ ] **Testing**: Manual test semua flow end-to-end

Kalau deadline sudah dekat, prioritaskan Phase 1-4 selesai dulu!

---

**Status: Ready for PHASE 2-4 sequential execution**
