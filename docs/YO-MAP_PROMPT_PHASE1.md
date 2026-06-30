# YO MAP PHASE 1: FOUNDATION & SETUP
**Durasi: 2-3 jam | Prioritas: CRITICAL**

---

Ini adalah fase pertama setup project YO MAP dengan deadline BESOK.

**WAJIB dikerjakan sebelum PHASE 2.** Jangan skip apapun di fase ini.

---

## TUGAS PHASE 1: SETUP INFRASTRUCTURE

Buat dan setup seluruh foundation project Next.js 14 + Supabase + Prisma.

### TUGAS 1: Buat Next.js 14 Project Structure

Jalankan perintah ini di terminal (Antigravity bisa suggest command):

```bash
npx create-next-app@latest yo-map --typescript --tailwind --app
cd yo-map
npm install @tanstack/react-query @supabase/supabase-js @supabase/auth-helpers-nextjs @prisma/client prisma axios lucide-react clsx
```

ATAU kalau Antigravity sudah punya akses repo, clone dari GitHub (kalau ada).

Pastikan struktur folder jadi:
```
yo-map/
├── app/
├── lib/
├── components/
├── types/
├── prisma/
├── public/
├── .env.local
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

### TUGAS 2: Setup Environment Variables

Buat file `.env.local` di root project dengan isi:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# Database
DATABASE_URL=postgresql://postgres:PASSWORD@YOUR_PROJECT.supabase.co:5432/postgres

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**PENTING:** 
- Get Supabase credentials dari dashboard Supabase project
- Jangan push .env.local ke GitHub
- Kalau belum punya Supabase account, buat di https://supabase.com

### TUGAS 3: Buat Prisma Schema

File: `prisma/schema.prisma`

Copy isi dari handoff document (Prisma schema section).

WAJIB include semua model:
- User, Quiz, Pertanyaan, OpsiJawaban, JawabQuiz
- HasilAnalisis, RekomendasiJurusan, Jurusan
- SoftSkill, SoftSkillProgress

Setelah dibuat, jalankan:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Ini akan:
1. Generate Prisma client
2. Buat database schema di Supabase
3. Create initial migration

Kalau ada error saat migrate, debug dengan:
```bash
npx prisma db push --force-reset (WARNING: this will reset database)
```

### TUGAS 4: Setup Supabase Client

File: `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Untuk server-side operations (API routes)
export const supabaseServer = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
```

### TUGAS 5: Setup Prisma Client

File: `lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### TUGAS 6: Setup Root Layout + Providers

File: `app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'YO MAP - Tes Minat Bakat & Rekomendasi Jurusan',
  description: 'Platform tes minat bakat dengan AI recommendation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

File: `app/providers.tsx`

```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### TUGAS 7: Setup TypeScript Types

File: `types/index.ts`

```typescript
export type User = {
  id: string
  email: string
  nama_lengkap: string
  nama_panggilan?: string
  status_verifikasi: 'unverified' | 'verified'
  usia?: number
  jenis_kelamin?: string
  asal_sekolah?: string
  kota?: string
  created_at: string
  updated_at: string
}

export type Quiz = {
  id: string
  judul: string
  deskripsi?: string
  kategori: string
  total_pertanyaan: number
  waktu_menit?: number
  created_at: string
}

export type Pertanyaan = {
  id: string
  quiz_id: string
  urutan: number
  pertanyaan_text: string
  tipe: 'single_choice' | 'multiple_choice' | 'scale'
  opsi_jawaban: OpsiJawaban[]
}

export type OpsiJawaban = {
  id: string
  pertanyaan_id: string
  teks: string
  nilai_skor: number
}

export type JawabQuiz = {
  id: string
  user_id: string
  quiz_id: string
  opsi_jawaban_id: string
  nilai_skor?: number
  created_at: string
}

export type HasilAnalisis = {
  id: string
  user_id: string
  quiz_id: string
  total_skor: number
  persentase: number
  kategori_hasil: string
  interpretasi: string
  created_at: string
}

export type RekomendasiJurusan = {
  id: string
  user_id: string
  jurusan_id: string
  skor_kompatibilitas: number
  alasan?: string
  created_at: string
}

export type Jurusan = {
  id: string
  nama: string
  deskripsi?: string
  universitas?: string
  prospek_karir: string[]
  skills_dibutuhkan: string[]
  tipe_minat: string
  created_at: string
}

export type SoftSkill = {
  id: string
  nama: string
  deskripsi: string
  kategori: string
  modul_pembelajaran?: string
  created_at: string
}

export type SoftSkillProgress = {
  id: string
  user_id: string
  soft_skill_id: string
  progress_persen: number
  status_selesai: boolean
}

// Auth types
export type AuthResponse = {
  user: User | null
  session: any | null
  error: string | null
}

export type LoginFormData = {
  email: string
  password: string
}

export type RegisterFormData = {
  email: string
  password: string
  confirm_password: string
  nama_lengkap: string
}
```

### TUGAS 8: Setup Auth Context/Service

File: `lib/auth.ts`

```typescript
import { supabase } from './supabase'
import { LoginFormData, RegisterFormData, User } from '@/types'

export async function login(data: LoginFormData) {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) throw error

    return { 
      success: true, 
      user: authData.user,
      session: authData.session 
    }
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Login failed' 
    }
  }
}

export async function register(data: RegisterFormData) {
  try {
    if (data.password !== data.confirm_password) {
      throw new Error('Passwords do not match')
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nama_lengkap: data.nama_lengkap,
        },
      },
    })

    if (error) throw error

    return { 
      success: true, 
      user: authData.user,
    }
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Registration failed' 
    }
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Logout failed' 
    }
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    return null
  }
}
```

### TUGAS 9: Setup TanStack Query Hooks

File: `lib/queries.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from './axios' // akan dibuat di PHASE 2

// Quiz queries
export const useQuizList = () =>
  useQuery({
    queryKey: ['quiz-list'],
    queryFn: async () => {
      const res = await axios.get('/api/quiz')
      return res.data
    },
  })

export const useQuizDetail = (quizId: string) =>
  useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      const res = await axios.get(`/api/quiz/${quizId}`)
      return res.data
    },
    enabled: !!quizId,
  })

// Submit answers
export const useSubmitQuizAnswers = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post('/api/quiz/submit', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hasil-analisis'] })
    },
  })
}

// Hasil analisis
export const useHasilAnalisis = (userId: string, quizId: string) =>
  useQuery({
    queryKey: ['hasil-analisis', userId, quizId],
    queryFn: async () => {
      const res = await axios.get(`/api/hasil-analisis?userId=${userId}&quizId=${quizId}`)
      return res.data
    },
    enabled: !!userId && !!quizId,
  })

// Rekomendasi jurusan
export const useRekomendasiJurusan = (userId: string) =>
  useQuery({
    queryKey: ['rekomendasi-jurusan', userId],
    queryFn: async () => {
      const res = await axios.get(`/api/rekomendasi-jurusan?userId=${userId}`)
      return res.data
    },
    enabled: !!userId,
  })
```

### TUGAS 10: Setup Axios Instance

File: `lib/axios.ts`

```typescript
import axiosInstance from 'axios'

export const axios = axiosInstance.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add interceptor untuk auth token (kalau perlu)
axios.interceptors.request.use((config) => {
  // Bisa tambah auth token dari localStorage/session
  return config
})
```

### TUGAS 11: Setup Tailwind CSS

File: `tailwind.config.ts` (Shadcn UI compatible)

```typescript
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
```

### TUGAS 12: Landing Page Placeholder

File: `app/page.tsx`

```typescript
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎯 YO MAP
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Tes Minat Bakat & Rekomendasi Jurusan
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Masuk
          </Link>
          <Link href="/register" className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  )
}
```

### TUGAS 13: Check & Verify Setup

Setelah semua di-setup, jalankan:

```bash
npm run dev
```

Buka http://localhost:3000 - harusnya muncul landing page dengan tombol Login & Register.

**Verify checklist:**
- [ ] Landing page muncul
- [ ] .env.local sudah diisi dengan Supabase credentials
- [ ] Prisma migration berhasil (database created di Supabase)
- [ ] No errors di terminal
- [ ] TailwindCSS styling sudah jalan (background gradient terlihat)

---

## ERROR HANDLING PHASE 1

Kalau ada error:

1. **Prisma migration error**: 
   - Cek DATABASE_URL di .env.local
   - Bisa reset database: `npx prisma db push --force-reset`

2. **Supabase connection error**:
   - Verifikasi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_ANON_KEY
   - Check di dashboard Supabase

3. **Tailwind not working**:
   - Restart dev server (`npm run dev`)
   - Clear Next.js cache: `rm -rf .next`

4. **Import errors**:
   - Run `npm install` ulang
   - Clear node_modules: `rm -rf node_modules && npm install`

---

## NEXT: PHASE 2

Setelah PHASE 1 selesai dan verified, lanjut ke **PHASE 2: AUTH PAGES**.

Jangan lanjut ke PHASE 2 kalau PHASE 1 belum fully working!

---

**Status: Ready for PHASE 1 execution**

Copy prompt ini lengkap ke Antigravity dan jalankan.
