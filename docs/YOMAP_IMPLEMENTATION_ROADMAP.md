# YO-MAP Implementation Roadmap (URGENT - Deadline: Tomorrow)
**Status**: Phase 1 Complete. Phase 2-4 Priority Build.

---

## 🎯 Strategic Priority Matrix

```
CRITICAL (Must Have for MVP)          IMPORTANT (Nice to Have)         FUTURE
├─ Phase 2: Auth (Login/Register)     ├─ Email verification             ├─ Admin dashboard
├─ Phase 3: Quiz Core (DATA + UI)     ├─ Password reset                 ├─ Analytics
├─ Phase 4: Results Page              ├─ User profile edit              ├─ Soft skills module
├─ Rekomendasi Page                   ├─ Detail jurusan full info       └─ Notification system
└─ Deploy & Test                      └─ Career prospects detailed
```

---

## 📋 PHASE 2: AUTHENTICATION (2-3 hours)
**Status**: Folders exist, need to implement & test

### Step 2.1: Verify & Fix Supabase Connection
```
Location: src/lib/supabase/
Task:
  [ ] Verify server.ts has correct Supabase client config
  [ ] Verify client.ts for browser-side auth
  [ ] Test connection with simple query
Priority: CRITICAL - blocks everything else
```

### Step 2.2: Implement Login Page
```
Location: src/app/auth/login/page.tsx
Task:
  [ ] Use Shadcn Form + Input components
  [ ] Email & password fields
  [ ] Call Supabase signInWithPassword()
  [ ] Redirect to /dashboard on success
  [ ] Show error toast on failure
  [ ] Link to register page
Dependencies: Supabase client ready
Time: 30-45 min
```

### Step 2.3: Implement Register Page
```
Location: src/app/auth/register/page.tsx
Task:
  [ ] Email, password, nama_lengkap fields
  [ ] Call Supabase signUp()
  [ ] Auto-insert into User table (via trigger or manual)
  [ ] Redirect to login with success message
  [ ] Link to login page
Dependencies: Login page done
Time: 30-45 min
```

### Step 2.4: Middleware Protection
```
Location: middleware.ts (if not exists, create at root)
Task:
  [ ] Protect /app/* routes (require auth)
  [ ] Redirect unauthenticated users to /auth/login
  [ ] Allow /auth/* and / (landing page) for public
  [ ] Preserve query params for redirect after login
Dependencies: Login/Register done
Time: 20 min
```

---

## 🔥 PHASE 3: QUIZ CORE (4-5 hours) - MOST CRITICAL

### Step 3.1: Seed Quiz Data to Database
```
Location: prisma/seed.ts
Task:
  [ ] Create 36 RIASEC items (6 per domain × 6 items):
      - R1-R6, I1-I6, A1-A6, S1-S6, E1-E6, C1-C6
      - Text from RIASEC_TEST.txt
      - Options: STS (0), TS (1), N (2), S (3), SS (4)
      - Store as JSON: { value: 0-4, label: "STS/TS/N/S/SS" }
  [ ] Create 15 DAT Test questions:
      - 5 Verbal (Penalaran Logika)
      - 5 Numerik (Kemampuan Hitung)
      - 5 Klarikal (Presisi Tinggi)
      - Options: A, B, C, D, E
  [ ] Run: npx prisma db seed
Dependencies: Prisma schema verified
Time: 1-1.5 hours
Checklist:
  - [ ] seed.ts created with 51 questions
  - [ ] npm run prisma:seed runs without error
  - [ ] Verify data in DB: SELECT COUNT(*) FROM "Quiz"
```

### Step 3.2: Build Quiz Section 1 UI (RIASEC)
```
Location: src/app/(app)/quiz/page.tsx
Task:
  [ ] Page layout:
      - Header: "Tes Minat & Bakat" + progress indicator
      - Section title: "SESI 1 - TES RIASEC"
      - Item counter: "Soal X dari 36"
      - Question text (centered, large)
      - 5 radio buttons (STS, TS, N, S, SS)
      - Previous/Next buttons
      - Progress bar (36 items)
  [ ] State management (React hooks):
      - Current question index
      - Answers array (36 items)
      - Current section (1 or 2)
  [ ] Fetch quiz data from API/database on mount
  [ ] Save progress to state, NOT to DB yet
Dependencies: Data seeded
Time: 1.5-2 hours
```

### Step 3.3: Build Quiz Section 2 UI (DAT)
```
Location: Same page, different section
Task:
  [ ] 3 subsections (Verbal, Numerik, Klarikal) with tabs
  [ ] Each shows question + 4-5 option buttons
  [ ] Counter: "Soal X dari 5" per subsection
  [ ] Toggle between sections with tab buttons
  [ ] Same state management as Section 1
  [ ] Show Section 1 score summary before Section 2
Dependencies: Section 1 done
Time: 1.5-2 hours
```

### Step 3.4: Implement Submit & Scoring Logic
```
Location: src/lib/actions/quiz-engine.ts
Task:
  [ ] Function: calculateRIASECScores(answers: number[])
      Input: Array of 36 answers (0-4)
      Output: {R: 24, I: 28, A: 22, S: 15, E: 18, C: 20}
      Logic: Sum answers for each 6-item domain
  
  [ ] Function: mapToRIASECCode(scores: Record<string, number>)
      Input: {R, I, A, S, E, C}
      Output: "RIA" (top 3 scores sorted)
      Logic: Sort descending, take 3 letters
  
  [ ] Function: calculateDATScores(datAnswers: {v, n, c})
      Input: {verbal: score, numeric: score, clerical: score}
      Output: {verbalScore, numericScore, klarikalScore}
      Logic: Count correct answers
  
  [ ] Create Server Action: submitQuiz()
      - Receive all quiz answers from client
      - Validate with Zod schema
      - Calculate all scores server-side
      - Upsert into QuizResult (@@unique[user_id])
      - Return {riasecCode, suggestedField}
      - Redirect to /app/hasil-analisis

Dependencies: Section 1 & 2 UI done
Time: 1-1.5 hours
```

### Step 3.5: Connect Quiz UI to Submission
```
Location: src/app/(app)/quiz/page.tsx
Task:
  [ ] Add Submit button (visible only after all 51 questions answered)
  [ ] On click: call submitQuiz() server action
  [ ] Show loading spinner during submission
  [ ] On success: redirect to /hasil-analisis
  [ ] On error: show error toast
Dependencies: All previous steps
Time: 30 min
```

---

## 📊 PHASE 4: RESULTS & RECOMMENDATION (2-3 hours)

### Step 4.1: Build Hasil Analisis Page
```
Location: src/app/(app)/hasil-analisis/page.tsx
Task:
  [ ] Fetch user's latest QuizResult from DB
  [ ] Display:
      - RIASEC bar chart (6 bars, %)
      - Heading: RIASEC code (e.g., "RIA")
      - DAT scores (Verbal, Numerik, Klarikal) with badges
      - Description: Match quality + recommended fields
      - Button: "Lihat Rekomendasi Jurusan"
  [ ] Design from Figma SS#3
Dependencies: Quiz Phase done + QuizResult saved
Time: 1-1.5 hours
```

### Step 4.2: Build Rekomendasi Jurusan Page
```
Location: src/app/(app)/rekomendasi-jurusan/page.tsx
Task:
  [ ] Fetch top 3-5 matching majors for user's RIASEC code
  [ ] Display as list:
      - Rank (1, 2, 3)
      - Major name
      - Match score (%)
      - Button: "Detail"
  [ ] Hardcoded mapping for MVP:
      RIA → [Teknik Informatika, System Informasi, Data Science]
      RIS → [Teknik Mesin, Kedokteran, Perawat]
      ... (add 5-10 common codes)
  [ ] Design from Figma SS#4
Dependencies: Hasil Analisis done
Time: 1-1.5 hours
```

### Step 4.3: Build Detail Jurusan Page
```
Location: src/app/(app)/detail-jurusan/[id]/page.tsx
Task:
  [ ] Fetch major data from hardcoded object or DB
  [ ] Display:
      - Major name + icon
      - Description
      - Career prospects (list)
      - Skills needed (list)
      - Curriculum overview
      - Button: "Lihat Kurikulum Lengkap"
  [ ] For MVP: Hardcode 3-5 popular majors with data from JOB_RECCOMENDATION.docx
  [ ] Design from Figma SS#5
Dependencies: Rekomendasi page done
Time: 1 hour
```

---

## 🔌 API Endpoints Checklist

Create these if missing:

```
[POST] /api/auth/login
[POST] /api/auth/register
[POST] /api/auth/logout
[GET] /api/quiz (fetch all questions)
[POST] /api/quiz/submit (server action, not REST)
[GET] /api/hasil-analisis (fetch user's latest result)
[GET] /api/rekomendasi-jurusan (fetch recommendations)
```

---

## 📦 Database Seeding Checklist

Before starting Phase 3, run this:

```bash
# 1. Verify schema is correct
npx prisma validate

# 2. Create migration if schema changed
npx prisma migrate dev --name add_quiz_questions

# 3. Run seed
npx prisma db seed

# 4. Verify data
npx prisma studio
```

Expected:
- Quiz table: 51 rows (36 RIASEC + 15 DAT)
- Each with tipe_soal, kesulitan, teks_soal, pilihan_jawaban, kunci_jawaban

---

## 🎨 Figma Design Tokens to Implement

From Page 2:

```css
/* Colors */
--primary-blue: #0A5BA3
--success-green: #22C55E
--warning-orange: #F59E0B
--danger-red: #EF4444

/* Typography */
--font-family: "Plus Jakarta Sans"
--heading-lg: 32px, weight 700
--heading-md: 24px, weight 600
--body: 16px, weight 400

/* Spacing */
--spacing-unit: 8px (use multiples: 8, 16, 24, 32)
```

Add to `src/app/globals.css`:
```css
@theme inline {
  --color-primary-blue: #0A5BA3;
  --color-success-green: #22C55E;
  /* ... */
}
```

---

## ⚡ Time Estimate Summary

| Phase | Task | Hours | Status |
|-------|------|-------|--------|
| 2 | Auth (Login/Register/Middleware) | 2-3 | TODO |
| 3.1 | Data Seeding | 1-1.5 | TODO |
| 3.2 | Quiz Section 1 UI | 1.5-2 | TODO |
| 3.3 | Quiz Section 2 UI | 1.5-2 | TODO |
| 3.4 | Scoring Logic | 1-1.5 | TODO |
| 3.5 | Submit Integration | 0.5 | TODO |
| 4.1 | Hasil Analisis Page | 1-1.5 | TODO |
| 4.2 | Rekomendasi Page | 1-1.5 | TODO |
| 4.3 | Detail Jurusan Page | 1 | TODO |
| **TOTAL** | | **12-15 hours** | |

**Realistic for tomorrow?** YES, if:
- Start early
- Focus MVP first (no fancy animations)
- Hardcode data where possible
- Skip Phase 5 polish for now
- Test on localhost only

---

## 🚀 Execution Order (Prioritized)

```
1. PHASE 2 → Auth works (blocks nothing else)
2. PHASE 3.1 → Data seeded (unblocks 3.2-3.5)
3. PHASE 3.2-3.3 → UI built (parallel work possible)
4. PHASE 3.4-3.5 → Scoring & submit (depends on UI)
5. PHASE 4.1-4.3 → Results pages (depends on Phase 3)
6. TEST → Full flow: login → quiz → results → recommendations
7. DEPLOY → Vercel (if time allows)
```

---

## 🛑 Blockers to Check First

```
[ ] Supabase project created & credentials in .env?
[ ] Database connected & accessible?
[ ] Prisma client generated? (npx prisma generate)
[ ] Node modules installed? (npm install)
[ ] Next.js dev server runs? (npm run dev)
[ ] Login/Register pages have Supabase calls?
```

---

## 📝 Next Steps

1. **Confirm** all blockers are cleared
2. **Start** with Phase 2 (shortest time, highest impact)
3. **Parallel** Phase 3.1 (data seeding) while Phase 2 testing
4. **Build** Phase 3 UI aggressively (3.2 + 3.3)
5. **Implement** scoring + submit (3.4 + 3.5)
6. **Build** results pages (4.1-4.3) in parallel if possible
7. **Test** full flow end-to-end
8. **Deploy** or just ensure localhost works perfectly

---

## 💡 MVP Shortcuts (to save time)

- No email verification (verify on sign-up only)
- Hardcoded major recommendations (not dynamic)
- No animations (just Shadcn defaults)
- No admin panel (Phase 5)
- Results page can be minimal (Figma can be simplified)
- Detail jurusan can have placeholder content

---

**Ready to start? Which phase should we tackle first?** 🚀
