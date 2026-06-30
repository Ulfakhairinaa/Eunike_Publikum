# YO MAP - Handoff Document (Full Web App)
**Deadline:** Besok | **Scope:** Full Web App | **Priority:** Core Features First

---

## 1. Identitas Project

- **Nama:** YO MAP (Tes Minat Bakat & Rekomendasi Jurusan)
- **Platform:** Web (Next.js 14+ App Router)
- **Type:** Full-Stack Application
- **Figma:** https://www.figma.com/design/JLTvAhZ2mJHiFSitGoLy3c/YO-MAP?node-id=58-2
- **Figma Page:** Page 2 (semua frame penting)
- **Dokumentasi:** PRD, SDD, SRS (format MD, sudah ada di Antigravity)

---

## 2. Tech Stack (FINAL)

```yaml
Frontend:
  - Framework: Next.js 14+ (App Router)
  - Language: TypeScript (strict mode)
  - Styling: Tailwind CSS + Shadcn UI
  - State & Data Fetching: TanStack Query (React Query)
  - HTTP Client: Axios / Fetch API

Backend:
  - Database: Supabase PostgreSQL
  - ORM: Prisma
  - Authentication: Supabase Auth (email/password + social)
  - API: Next.js API Routes

DevTools:
  - Build: Next.js built-in
  - Testing: Jest + React Testing Library (opsional, skip kalau deadline ketat)
  - Deployment: Vercel (rekomendasi untuk Next.js)
```

---

## 3. Struktur Project Next.js 14

```
yo-map/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (app)/
│   │   ├── dashboard/page.tsx
│   │   ├── quiz/
│   │   │   ├── [id]/page.tsx (halaman quiz individual)
│   │   │   └── page.tsx (list quiz)
│   │   ├── hasil-analisis/page.tsx
│   │   ├── rekomendasi-jurusan/page.tsx
│   │   ├── detail-jurusan/[id]/page.tsx
│   │   ├── prospek-karir/page.tsx
│   │   ├── modul-soft-skill/page.tsx
│   │   └── layout.tsx (dengan navigation bar)
│   ├── page.tsx (landing page)
│   └── layout.tsx (root layout + providers)
├── api/ (API Routes untuk backend logic)
│   ├── auth/
│   │   ├── login.ts
│   │   └── register.ts
│   ├── quiz/
│   │   ├── [id]/route.ts (GET quiz, POST jawaban)
│   │   └── route.ts (GET all quiz)
│   ├── hasil-analisis/route.ts
│   └── rekomendasi-jurusan/route.ts
├── lib/
│   ├── supabase.ts (Supabase client config)
│   ├── prisma.ts (Prisma client)
│   ├── auth.ts (auth utilities)
│   └── queries.ts (React Query hooks)
├── components/
│   ├── auth/ (LoginForm, RegisterForm)
│   ├── quiz/ (QuizCard, QuestionCard, AnswerOption)
│   ├── layout/ (Header, Navbar, Footer, Sidebar)
│   ├── cards/ (JurusanCard, KarirCard, SoftSkillCard)
│   └── ui/ (Shadcn components)
├── types/
│   └── index.ts (TypeScript types & interfaces)
├── prisma/
│   └── schema.prisma (database schema)
├── .env.local (environment variables - JANGAN push)
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 4. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                    String   @id @default(cuid())
  email                 String   @unique
  password_hash         String?
  nama_lengkap          String
  nama_panggilan        String?
  status_verifikasi     String   @default("unverified") // unverified, verified
  
  // Profile
  usia                  Int?
  jenis_kelamin         String?
  asal_sekolah          String?
  kota                  String?
  
  // Relations
  quiz_jawaban          JawabQuiz[]
  hasil_analisis        HasilAnalisis[]
  rekomendasi_jurusan   RekomendasiJurusan[]
  soft_skill_progress   SoftSkillProgress[]
  
  created_at            DateTime @default(now())
  updated_at            DateTime @updatedAt
}

model Quiz {
  id                    String   @id @default(cuid())
  judul                 String
  deskripsi             String?
  kategori              String   // minat, bakat, kepribadian
  total_pertanyaan      Int
  waktu_menit           Int?
  
  // Relations
  pertanyaan            Pertanyaan[]
  jawaban_user          JawabQuiz[]
  
  created_at            DateTime @default(now())
}

model Pertanyaan {
  id                    String   @id @default(cuid())
  quiz_id               String
  urutan                Int
  pertanyaan_text       String
  tipe                  String   // single_choice, multiple_choice, scale
  
  // Relations
  quiz                  Quiz     @relation(fields: [quiz_id], references: [id], onDelete: Cascade)
  opsi_jawaban          OpsiJawaban[]
  
  @@index([quiz_id])
}

model OpsiJawaban {
  id                    String   @id @default(cuid())
  pertanyaan_id         String
  teks                  String
  nilai_skor            Int      // untuk scale/poin
  
  // Relations
  pertanyaan            Pertanyaan @relation(fields: [pertanyaan_id], references: [id], onDelete: Cascade)
  jawaban_user          JawabQuiz[] @relation("PilihOpsi")
  
  @@index([pertanyaan_id])
}

model JawabQuiz {
  id                    String   @id @default(cuid())
  user_id               String
  quiz_id               String
  opsi_jawaban_id       String
  nilai_skor            Int?
  
  // Relations
  user                  User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  quiz                  Quiz     @relation(fields: [quiz_id], references: [id], onDelete: Cascade)
  opsi                  OpsiJawaban @relation("PilihOpsi", fields: [opsi_jawaban_id], references: [id], onDelete: Cascade)
  
  created_at            DateTime @default(now())
  
  @@unique([user_id, quiz_id, opsi_jawaban_id])
  @@index([user_id, quiz_id])
}

model HasilAnalisis {
  id                    String   @id @default(cuid())
  user_id               String
  quiz_id               String
  total_skor            Int
  persentase            Float
  kategori_hasil        String   // misal: "Realis", "Investigatif", dll
  interpretasi          String   // penjelasan hasil
  
  // Relations
  user                  User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  created_at            DateTime @default(now())
  
  @@unique([user_id, quiz_id])
  @@index([user_id])
}

model RekomendasiJurusan {
  id                    String   @id @default(cuid())
  user_id               String
  jurusan_id            String
  skor_kompatibilitas   Float    // 0-100
  alasan                String?
  
  // Relations
  user                  User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  jurusan               Jurusan  @relation(fields: [jurusan_id], references: [id], onDelete: Cascade)
  
  created_at            DateTime @default(now())
  
  @@index([user_id])
}

model Jurusan {
  id                    String   @id @default(cuid())
  nama                  String
  deskripsi             String?
  universitas           String?
  prospek_karir         String[]
  skills_dibutuhkan     String[]
  tipe_minat            String   // untuk matching
  
  // Relations
  rekomendasi           RekomendasiJurusan[]
  
  created_at            DateTime @default(now())
}

model SoftSkill {
  id                    String   @id @default(cuid())
  nama                  String
  deskripsi             String
  kategori              String   // komunikasi, kepemimpinan, dll
  modul_pembelajaran    String?  // URL atau inline content
  
  created_at            DateTime @default(now())
}

model SoftSkillProgress {
  id                    String   @id @default(cuid())
  user_id               String
  soft_skill_id         String
  progress_persen       Int      // 0-100
  status_selesai        Boolean  @default(false)
  
  // Relations
  user                  User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  soft_skill            SoftSkill @relation(fields: [soft_skill_id], references: [id], onDelete: Cascade)
  
  @@unique([user_id, soft_skill_id])
  @@index([user_id])
}
```

---

## 5. Daftar Screen dari Figma Page 2

Berikut frame yang harus di-extract dari Figma (pakai Figma MCP):

| No | Frame Name | Prioritas | Catatan |
|----|-----------|----------|---------|
| 1 | Landing Page | Medium | Homepage intro, call-to-action ke login/register |
| 2 | Login | HIGH | Form email + password, link ke register |
| 3 | Register | HIGH | Form email, password, nama lengkap, confirm password |
| 4 | Dashboard / Beranda | HIGH | Menu utama, list quiz, progress tracking |
| 5 | Quiz List | HIGH | Grid/list semua quiz tersedia |
| 6 | Quiz Detail / Halaman Tes Minat Bakat | HIGH | Pertanyaan + opsi jawaban, progress bar |
| 7 | Hasil Analisis | HIGH | Skor, interpretasi, rekomendasi next step |
| 8 | Rekomendasi Jurusan | HIGH | List jurusan match dengan score |
| 9 | Detail Jurusan | Medium | Info lengkap jurusan, prospek karir |
| 10 | Prospek Karir | Medium | List karir sesuai hasil tes |
| 11 | Modul Soft Skill | Medium | List modul pembelajaran |
| 12 | Navigation / Navbar | HIGH | Header + sidebar/bottom nav |
| 13 | Poin Quiz (Score Board) | Low | Leaderboard / progress tracking |

**Total Screen:** 13 frame penting

---

## 6. Authentication Flow

```
User Landing Page
  ↓
[Login] atau [Register]
  ↓
[Register] → Form (email, password, nama) → Create user di Supabase 
  → Auto login → Dashboard
  ↓
[Login] → Form (email, password) → Validate via Supabase Auth 
  → Get JWT token → Dashboard
  ↓
[Protected Routes] → Check token di middleware → Redirect ke login 
  kalau tidak ada token
  ↓
[Logout] → Delete session → Redirect ke landing page
```

---

## 7. Core Workflows (MVP Deadline Besok)

### Workflow 1: User Registration & Login ✅ WAJIB
- Register dengan email + password
- Email verification (opsional bisa skip untuk demo)
- Login dan mendapat JWT
- Session management

### Workflow 2: Quiz Flow ✅ WAJIB
- List semua quiz
- Tampilkan pertanyaan 1 per 1 atau semua sekaligus
- User pilih jawaban
- Submit → hitung skor → tampilkan hasil
- Simpan hasil ke database

### Workflow 3: Hasil Analisis & Rekomendasi ✅ WAJIB
- Hitung skor berdasarkan jawaban
- Generate interpretasi hasil (tipe minat bakat)
- Recommend jurusan match (simple algoritma matching)
- Tampilkan di halaman hasil & rekomendasi

### Workflow 4: Profil & History (opsional kalau ada waktu)
- Lihat hasil quiz yang sudah dikerjakan
- Progress soft skill
- Edit profil

---

## 8. Prioritas Pengerjaan (URGENT - Deadline Besok)

**PHASE 1: FOUNDATION (2-3 jam)**
```
1. Setup Next.js 14 App Router
2. Setup Supabase connection + Prisma schema
3. Setup Shadcn UI + Tailwind CSS
4. Environment variables (.env.local)
5. Root layout + providers (Auth context, TanStack Query)
```

**PHASE 2: AUTH (1-2 jam)**
```
1. Login page + form
2. Register page + form
3. Supabase Auth integration
4. Protected routes middleware
5. Navigation bar dengan logout
```

**PHASE 3: QUIZ CORE (2-3 jam)**
```
1. Dashboard/beranda page
2. Quiz list page
3. Quiz detail page (pertanyaan + jawaban)
4. Submit logic + score calculation
5. Hasil analisis page
```

**PHASE 4: REKOMENDASI (1-2 jam)**
```
1. Rekomendasi jurusan page
2. Detail jurusan page
3. Matching algorithm (simple)
```

**PHASE 5: OPTIONAL (kalau masih ada waktu)**
```
1. Prospek karir page
2. Modul soft skill page
3. Landing page polish
4. Navbar/navigation polish
```

**TOTAL PERKIRAAN: 7-10 jam kerja non-stop**

---

## 9. Environment Variables (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Database
DATABASE_URL=postgresql://user:password@host:5432/db_name

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 10. Dependency List (package.json)

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@tanstack/react-query": "^5.0.0",
    "@supabase/supabase-js": "^2.37.0",
    "@supabase/auth-helpers-nextjs": "^0.7.0",
    "@prisma/client": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "@headlessui/react": "^1.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.263.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "prisma": "^5.0.0",
    "shadcn-ui": "^0.7.0"
  }
}
```

---

## 11. Figma MCP Query

Gunakan Figma MCP dengan:
```
File ID: JLTvAhZ2mJHiFSitGoLy3c
Page: Page 2
Frames to extract: Landing Page, Login, Register, Dashboard, Quiz List, 
Quiz Detail, Hasil Analisis, Rekomendasi Jurusan, Detail Jurusan, 
Prospek Karir, Modul Soft Skill, Navigation/Navbar, Poin Quiz
```

---

## 12. PERINGATAN DEADLINE KETAT

Karena deadline BESOK (full web app):
- ✅ Skip landing page polish, focus quiz + auth + hasil analisis
- ✅ Database schema pasti jelas, jangan refactor di tengah jalan
- ✅ Gunakan Shadcn UI components jadi fast (jangan custom styling)
- ✅ Skip testing, focus functionality
- ✅ Skip email verification, social auth - hanya email/password
- ✅ Skip fancy animations - fokus working features
- ✅ Skip error pages, focus core flows
- ⚠️ Kalau stuck di Supabase/Prisma, bisa fallback ke dummy data + JSON state

---

## 13. Next Steps

1. **Confirm** Figma API access (gunakan token yang sama dari SISA+)
2. **Setup** Next.js project locally atau via Vercel
3. **Run** Prompt PHASE 1 untuk foundation
4. **Chain** prompts PHASE 2-5 berurutan
5. **Cross-check** setiap phase dengan Figma page 2

**Ready to execute Phase 1 prompt?**
