# YO-MAP MASTER CHECKLIST & QUICK START
**Deadline**: Tomorrow | **Status**: Ready to Execute

---

## 🎯 Strategic Overview (5-Second Version)

```
DO THIS FIRST          THEN THIS              THEN THIS           FINALLY
├─ Phase 2             ├─ Phase 3.1           ├─ Phase 3.2-3.4     ├─ Phase 4
├─ Auth (2-3 hrs)      ├─ Seed Data (1 hr)    ├─ Quiz UI & Logic   ├─ Results Pages
└─ Login/Register      └─ 51 Questions        └─ (3-4 hrs)         └─ (2-3 hrs)

TOTAL: ~9-13 hours | Parallelizable if you have help
```

---

## 📋 MASTER CHECKLIST (Copy-Paste Ready)

### PRE-FLIGHT CHECK (Do This First - 15 min)
```
[ ] Supabase credentials in .env.local?
    NEXT_PUBLIC_SUPABASE_URL=xxx
    NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
    DATABASE_URL=xxx
    DIRECT_URL=xxx
[ ] npm install done?
[ ] npm run dev starts without errors?
[ ] Can access http://localhost:3000?
[ ] Prisma client generated? (npx prisma generate)
```

**If any fail**: Fix these FIRST before proceeding

---

### PHASE 2: AUTHENTICATION (2-3 Hours)
**File Reference**: See `PHASE2_AUTH_IMPLEMENTATION.md`

#### Step 2.1: Verify Supabase Files
```
[ ] src/lib/supabase/server.ts exists & has @supabase/ssr config
[ ] src/lib/supabase/client.ts exists & has createBrowserClient
```

#### Step 2.2: Create Auth Server Actions
```
[ ] Create src/app/auth/actions.ts with login(), register(), logout()
[ ] Test: console.log each function to verify they exist
```

#### Step 2.3: Build Login Page
```
[ ] Create/Update src/app/auth/login/page.tsx
[ ] Has email + password inputs (Shadcn)
[ ] Has submit button that calls login() action
[ ] Has link to /auth/register
[ ] Shows error messages if login fails
[ ] Redirects to /app/dashboard on success
```

#### Step 2.4: Build Register Page
```
[ ] Create/Update src/app/auth/register/page.tsx
[ ] Has email + password + nama_lengkap inputs
[ ] Validates password >= 6 characters
[ ] Calls register() server action
[ ] Redirects to /auth/login on success
[ ] Shows error if email already exists
```

#### Step 2.5: Create Middleware
```
[ ] Create middleware.ts at ROOT level (same level as src/)
[ ] Protects /app/* routes (requires auth)
[ ] Redirects unauthenticated to /auth/login
[ ] Allows /auth/* and / for public
[ ] Test: Access /app/dashboard without login → redirects to /auth/login
```

#### Step 2.6: Test Auth Flow
```
[ ] npm run dev runs without errors
[ ] Visit http://localhost:3000 → landing page
[ ] Click register → /auth/register works
[ ] Fill form & submit → creates user in Supabase
[ ] Redirects to /auth/login
[ ] Login with credentials → redirects to /app/dashboard
[ ] Access /app/quiz without login → redirects to /auth/login
[ ] Logout button works (if it exists)
```

**BLOCKERS TO FIX**:
- [ ] If login doesn't work: Check Supabase credentials in .env.local
- [ ] If redirect fails: Verify middleware.ts is at root level
- [ ] If user not created: Check Supabase Auth & User table access

---

### PHASE 3.1: QUIZ DATA SEEDING (1-1.5 Hours)
**File Reference**: See `PHASE3_1_QUIZ_SEEDING.md`

#### Step 3.1.1: Update Prisma Schema
```
[ ] Check prisma/schema.prisma has Quiz model with:
    - tipe_soal (string)
    - domain (string, for RIASEC)
    - nomor_urut (int)
    - teks_soal (string)
    - pilihan_jawaban (Json)
    - kunci_jawaban (string)
[ ] If changes made: npx prisma migrate dev --name update_quiz_model
```

#### Step 3.1.2: Create Seed Data Files
```
[ ] Create prisma/seed-data.ts with RIASEC_QUESTIONS (36 items)
[ ] Add DAT_QUESTIONS (15 items) to same file
[ ] Copy full data from PHASE3_1_QUIZ_SEEDING.md section "File 1: seed-data.ts"
```

#### Step 3.1.3: Update Seed Script
```
[ ] Update prisma/seed.ts to import seed-data.ts
[ ] Copy code from PHASE3_1_QUIZ_SEEDING.md section "File 2: seed.ts"
[ ] Make sure it imports { RIASEC_QUESTIONS, DAT_QUESTIONS }
```

#### Step 3.1.4: Run Seed
```
[ ] npx prisma db push
[ ] npm run prisma:seed (or npx ts-node --esm prisma/seed.ts)
[ ] Verify output: "✅ Seeded 36 RIASEC questions"
[ ] Verify output: "✅ Seeded 15 DAT questions"
[ ] Verify: "✅ Database seed completed! Total questions: 51"
```

#### Step 3.1.5: Verify in Prisma Studio
```
[ ] npx prisma studio
[ ] Open Quiz table
[ ] Verify 51 rows exist
[ ] Check 1 RIASEC item: has domain "R", pilihan_jawaban is JSON array
[ ] Check 1 DAT item: tipe_soal is "Verbal", "Numerik", or "Klarikal"
```

**BLOCKERS TO FIX**:
- [ ] If seed fails: `npx prisma generate` first
- [ ] If 51 rows not there: Check seed.ts imports & syntax
- [ ] If JSON format wrong: Verify pilihan_jawaban structure matches

---

### PHASE 3.2-3.3: QUIZ UI (3-4 Hours)
**Critical Path**: Build quiz interface that captures 36 RIASEC + 15 DAT answers

#### Step 3.2: Create Quiz Page Structure
```
[ ] Create src/app/(app)/quiz/page.tsx
[ ] Implement state for:
    - riasecAnswers: number[] (36 items)
    - datAnswers: {verbal: [], numerik: [], klarikal: []}
    - currentSection: "riasec" | "dat"
    - currentQuestionIndex: number
[ ] Add Progress bar
[ ] Add Question counter display
```

#### Step 3.3: Build RIASEC Section
```
[ ] Fetch 36 quiz questions from DB on mount
[ ] Display question text centered
[ ] Display 5 radio buttons: "Sangat Tidak Suka" (0) to "Sangat Suka" (4)
[ ] Auto-advance to next Q when answer selected
[ ] Previous/Next buttons for navigation
[ ] Show progress bar (X/36)
[ ] Only show "Next Section" button when all 36 answered
```

#### Step 3.4: Build DAT Section
```
[ ] Add tabs for: Verbal, Numerik, Klarikal
[ ] Each subtab shows 5 questions
[ ] Each question shows 4-5 answer options (A, B, C, D, E)
[ ] Auto-advance between questions
[ ] Previous/Next to navigate within subtest
[ ] Show progress bar (X/5 per subtest)
[ ] Only show Submit when all 15 DAT answered
```

#### Step 3.5: Design from Figma
```
[ ] Colors: Primary Blue (#0A5BA3), Success Green (#22C55E)
[ ] Font: Plus Jakarta Sans
[ ] Spacing: Use 8px units (8, 16, 24, 32)
[ ] Match design from Figma Page 2 (Screenshots 1 & 2)
[ ] Dark blue sidebar with menu items
[ ] Light content area with questions
```

**BLOCKERS TO FIX**:
- [ ] If questions don't load: Check API route or DB query
- [ ] If styling wrong: Verify tailwind classes & color tokens
- [ ] If scroll issues: Add height constraints & overflow handling

---

### PHASE 3.4: QUIZ SCORING LOGIC (1-1.5 Hours)
**File Reference**: See `PHASE3_4_QUIZ_SCORING.md`

#### Step 3.4.1: Create Validation Schema
```
[ ] Create src/lib/quiz-schema.ts
[ ] Define QuizSubmissionSchema with Zod
[ ] Validates riasecAnswers (36 items, 0-4)
[ ] Validates datAnswers (verbal/numerik/klarikal, 5 items each)
[ ] Copy from PHASE3_4_QUIZ_SCORING.md section "File 1"
```

#### Step 3.4.2: Build Scoring Functions
```
[ ] Create/Update src/lib/actions/quiz-engine.ts
[ ] Implement calculateRIASECScores() → {R, I, A, S, E, C}
[ ] Implement mapToRIASECCode() → "RIA" (top 3 scores)
[ ] Implement calculateDATScores() → {verbal, numeric, clerical} out of 5
[ ] Implement scaleDATScores() → 0-100 scale
[ ] Implement determineSuggestedField() → "Saintek" or "Soshum"
[ ] Copy all functions from PHASE3_4_QUIZ_SCORING.md section "File 2"
```

#### Step 3.4.3: Implement submitQuiz() Server Action
```
[ ] Create submitQuiz(submission) server action
[ ] Validates input with Zod schema
[ ] Calculates all scores server-side
[ ] Upserts into QuizResult table (@@unique[user_id])
[ ] Returns: {success, riasecCode, suggestedField, scores}
[ ] On error: returns {success: false, error: message}
[ ] Copy from PHASE3_4_QUIZ_SCORING.md section "File 2"
```

#### Step 3.4.4: Connect Quiz UI to Submit
```
[ ] In quiz/page.tsx, add handleSubmit() function
[ ] Call submitQuiz() server action with all answers
[ ] Show loading spinner during submit
[ ] On success: router.push("/app/hasil-analisis")
[ ] On error: display error toast
[ ] Test with hardcoded test case:
    riasecAnswers: [0,1,2,3,4, ... x36]
    datAnswers: {verbal: ["B","A",...], ...}
```

#### Step 3.4.5: Test Scoring Logic
```
[ ] npm run dev
[ ] Create test account & login
[ ] Submit quiz with mock answers
[ ] Check Prisma Studio:
    - QuizResult created with correct scores
    - riasecCode calculated correctly (e.g., "RIA")
    - suggestedField set ("Saintek" or "Soshum")
[ ] Test with different answer patterns to verify logic
```

**BLOCKERS TO FIX**:
- [ ] If Zod validation fails: Check schema matches submitted data exactly
- [ ] If DB upsert fails: Check QuizResult table has @@unique([user_id])
- [ ] If redirect doesn't work: Verify router is imported correctly

---

### PHASE 4: RESULTS PAGES (2-3 Hours)
**Quick Version**: Show RIASEC chart + recommendations

#### Step 4.1: Build Hasil Analisis Page
```
[ ] Create src/app/(app)/hasil-analisis/page.tsx
[ ] Fetch user's QuizResult from DB on mount
[ ] Display:
    [ ] RIASEC code (e.g., "RIA") as heading
    [ ] 6 horizontal bar charts (R, I, A, S, E, C) with %
    [ ] DAT scores (Verbal, Numeric, Clerical) with % badges
    [ ] Text: Match quality description
    [ ] Button: "Lihat Rekomendasi Jurusan"
[ ] Design: Match Figma Screenshot #3
```

#### Step 4.2: Build Rekomendasi Jurusan Page
```
[ ] Create src/app/(app)/rekomendasi-jurusan/page.tsx
[ ] Hardcode major mapping for MVP (from career-map.ts)
[ ] Display top 3-5 majors:
    [ ] Rank number (1, 2, 3)
    [ ] Major name
    [ ] Match score (%)
    [ ] "Detail" button
[ ] Button: "Lihat Prospek Karir"
[ ] Design: Match Figma Screenshot #4
```

#### Step 4.3: Build Detail Jurusan Page
```
[ ] Create src/app/(app)/detail-jurusan/[id]/page.tsx
[ ] Display for selected major:
    [ ] Major name + icon
    [ ] Description (from hardcoded data)
    [ ] Career prospects (list, 3-5 options)
    [ ] Skills needed (list, 3-5 items)
    [ ] Curriculum overview
[ ] Design: Match Figma Screenshot #5
```

#### Step 4.4: Test Full Flow
```
[ ] Login as test user
[ ] Start quiz /app/quiz
[ ] Answer all 51 questions
[ ] Click Submit
[ ] Should redirect to /hasil-analisis
[ ] Verify RIASEC scores displayed
[ ] Click recommendation button
[ ] Verify majors listed
[ ] Click detail button
[ ] Verify major details shown
```

**BLOCKERS TO FIX**:
- [ ] If data not loading: Check DB queries & fetch functions
- [ ] If charts don't render: Verify recharts import & data format
- [ ] If styling off: Use Tailwind classes matching Figma

---

## 🚀 QUICK START EXECUTION PLAN

### TODAY (Next 2-3 hours):
```
1. PRE-FLIGHT CHECK (15 min)
2. PHASE 2 - Auth (2 hours)
   - Login page
   - Register page
   - Middleware
   - Quick test
3. PHASE 3.1 - Seeding (1 hour)
   - Copy seed-data.ts
   - Copy seed.ts
   - Run: npm run prisma:seed
   - Verify in Prisma Studio
```

### TOMORROW (First 6-8 hours):
```
1. PHASE 3.2-3.3 - Quiz UI (3-4 hours)
   - Build quiz/page.tsx
   - RIASEC section
   - DAT section
   - Navigation & progress
   
2. PHASE 3.4 - Scoring (1-1.5 hours)
   - Create quiz-schema.ts
   - Create quiz-engine.ts
   - Connect UI to submit action
   - Test scoring logic
   
3. PHASE 4 - Results (2-3 hours)
   - hasil-analisis page
   - rekomendasi-jurusan page
   - detail-jurusan page
   - Full flow test

4. DEPLOY (1 hour)
   - Push to GitHub
   - Deploy to Vercel (if time allows)
   - Final testing on production
```

---

## 📊 Time Breakdown

| Phase | Component | Time | Status | Notes |
|-------|-----------|------|--------|-------|
| Pre-Flight | Verification | 15 min | ⏳ | Required before start |
| 2 | Auth (Login/Register/Middleware) | 2-3 hrs | ⏳ | Blocking all other phases |
| 3.1 | Data Seeding | 1 hr | ⏳ | Needs to run before Phase 3.2 |
| 3.2-3.3 | Quiz UI | 3-4 hrs | ⏳ | Can parallelize UI building |
| 3.4 | Scoring Logic | 1-1.5 hrs | ⏳ | Depends on Phase 3.2-3.3 complete |
| 4.1-4.3 | Results Pages | 2-3 hrs | ⏳ | Depends on Phase 3.4 complete |
| Deploy | Push & Deploy | 1 hr | ⏳ | Last step |
| **TOTAL** | | **11-15 hrs** | | MVP ready |

**Realistic Timeline**: ~8-10 hours if focused & no blockers

---

## 🔥 CRITICAL SUCCESS FACTORS

```
✅ DO THESE FIRST (Non-Negotiable):
  1. Verify .env.local has all Supabase credentials
  2. Get Auth working before building quiz
  3. Seed data before building quiz UI
  4. Test scoring logic with mock data
  5. Build results pages after scoring confirmed working

❌ DON'T DO THESE:
  1. Don't build polish/animations (MVP only)
  2. Don't create soft skills module
  3. Don't build admin panel
  4. Don't add email verification flow
  5. Don't over-engineer the UI
```

---

## 📁 Implementation Files Reference

All code templates in these files:

```
1. PHASE2_AUTH_IMPLEMENTATION.md
   - Supabase config (server.ts, client.ts)
   - Login page template
   - Register page template
   - Auth actions template
   - Middleware template

2. PHASE3_1_QUIZ_SEEDING.md
   - prisma/schema.prisma updates
   - prisma/seed-data.ts (full 51 questions)
   - prisma/seed.ts (seeding script)

3. PHASE3_4_QUIZ_SCORING.md
   - quiz-schema.ts (Zod validation)
   - quiz-engine.ts (scoring functions)
   - quiz-engine.ts (submitQuiz action)
   - career-map.ts (hardcoded majors)

4. YOMAP_IMPLEMENTATION_ROADMAP.md
   - Strategic overview
   - Detailed phase breakdown
```

---

## 🆘 Emergency Debugging Commands

```bash
# Check if Supabase connection works
npx prisma studio

# Regenerate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Run seed script
npm run prisma:seed

# Check for TypeScript errors
npm run type-check

# Clear Next.js cache & rebuild
rm -rf .next && npm run build

# Kill any stuck processes
lsof -ti:3000 | xargs kill -9
```

---

## 💡 Quick Tips

1. **Test RIASEC scoring**: Create hardcoded test case
   ```javascript
   const testAnswers = new Array(36).fill(2); // All "Biasa Saja"
   const scores = calculateRIASECScores(testAnswers);
   console.log(scores); // Should show {R: 12, I: 12, A: 12, S: 12, E: 12, C: 12}
   ```

2. **Test DAT scoring**: Verify correct answers match seed data
   ```javascript
   const testDat = {
     verbal: ["B", "A", "B", "C", "B"],
     numerik: ["C", "A", "B", "B", "A"],
     klarikal: ["A", "B", "A", "B", "A"]
   };
   const scores = calculateDATScores(testDat);
   console.log(scores); // Should show {verbalScore: 5, ...}
   ```

3. **Check if user has quiz result**: 
   ```javascript
   const result = await getUserQuizResult(userId);
   if (!result) console.log("No quiz result yet");
   ```

---

## ✅ Final Verification Checklist

Before considering MVP "done":

```
[ ] User can register account
[ ] User can login
[ ] User can access /app/quiz (protected)
[ ] User can answer all 36 RIASEC questions
[ ] User can answer all 15 DAT questions
[ ] User can submit quiz
[ ] Results saved to DB
[ ] RIASEC code calculated correctly
[ ] User can see results on /hasil-analisis
[ ] User can see top 3 recommended majors
[ ] User can see major details
[ ] All pages styled (Figma colors)
[ ] No console errors
[ ] Mobile responsive (bonus)
[ ] Can logout
```

---

## 🎉 After MVP is Done

These are for Phase 5 (Future):
- Email verification flow
- Password reset
- Soft skills module
- Admin analytics dashboard
- Cron job notifications
- Detail career prospects
- University database integration
- Advanced filtering

---

**Ready to start?** Begin with **PRE-FLIGHT CHECK** above! 🚀
