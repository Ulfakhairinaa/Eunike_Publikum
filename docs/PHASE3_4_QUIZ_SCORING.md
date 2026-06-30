# PHASE 3.4: QUIZ SCORING LOGIC - IMPLEMENTATION
**Timeline**: 1-1.5 hours | **After**: Phase 3.2-3.3 (UI) complete

---

## 📋 What This Phase Does

```
User submits 51 answers
    ↓
Validate all answers (Zod)
    ↓
Calculate RIASEC scores (R, I, A, S, E, C: 0-24 each)
    ↓
Calculate DAT scores (Verbal, Numerik, Klarikal)
    ↓
Map to RIASEC code (3 letters: e.g., "RIA")
    ↓
Determine field type (Saintek or Soshum)
    ↓
Upsert QuizResult in DB (1:1 per user)
    ↓
Return results → redirect to /hasil-analisis
```

---

## ✅ Implementation Files

### File 1: `src/lib/quiz-schema.ts` (Validation)
**Status**: Create or update

```typescript
// src/lib/quiz-schema.ts
import { z } from "zod";

// RIASEC answers: array of 36 values (0-4 each)
export const RIASECAnswersSchema = z.array(z.number().min(0).max(4)).length(36);

// DAT answers: object with 3 arrays
export const DATAnswersSchema = z.object({
  verbal: z.array(z.string()).length(5),       // ["A", "B", "C", "D", "E"]
  numerik: z.array(z.string()).length(5),      // Correct answers
  klarikal: z.array(z.string()).length(5),     // "SAMA" or "BERBEDA"
});

// Combined quiz submission
export const QuizSubmissionSchema = z.object({
  riasecAnswers: RIASECAnswersSchema,
  datAnswers: DATAnswersSchema,
  userId: z.string().uuid(),
});

export type QuizSubmission = z.infer<typeof QuizSubmissionSchema>;
```

---

### File 2: `src/lib/actions/quiz-engine.ts` (Core Logic)
**Status**: Create or replace completely

```typescript
// src/lib/actions/quiz-engine.ts
"use server";

import { prisma } from "@/lib/prisma";
import { QuizSubmissionSchema, type QuizSubmission } from "@/lib/quiz-schema";
import { revalidatePath } from "next/cache";

/**
 * STEP 1: Calculate RIASEC Scores
 * Input: Array of 36 answers (0-4 each)
 * Output: { R, I, A, S, E, C } where each is 0-24
 */
export function calculateRIASECScores(
  riasecAnswers: number[]
): Record<string, number> {
  const scores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  // Group answers by domain (6 items per domain)
  const domains = ["R", "I", "A", "S", "E", "C"];
  domains.forEach((domain, domainIndex) => {
    const startIdx = domainIndex * 6;
    const endIdx = startIdx + 6;
    const domainAnswers = riasecAnswers.slice(startIdx, endIdx);
    scores[domain as keyof typeof scores] = domainAnswers.reduce((a, b) => a + b, 0);
  });

  return scores;
}

/**
 * STEP 2: Map Scores to RIASEC Code
 * Input: { R: 24, I: 28, A: 22, S: 15, E: 18, C: 20 }
 * Output: "RIA" (top 3 scores)
 */
export function mapToRIASECCode(scores: Record<string, number>): string {
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([key]) => key);

  return sorted.join("");
}

/**
 * STEP 3: Calculate DAT Scores
 * Input: { verbal: ["B", "A", ...], numerik: ["C", ...], klarikal: ["SAMA", ...] }
 * Output: { verbalScore: 5, numericScore: 4, klarikalScore: 5 }
 *
 * Hardcoded answer keys for MVP (in production, fetch from DB)
 */
export function calculateDATScores(datAnswers: {
  verbal: string[];
  numerik: string[];
  klarikal: string[];
}): { verbalScore: number; numericScore: number; klarikalScore: number } {
  // Correct answers (hardcoded for MVP - match seed-data.ts)
  const CORRECT_ANSWERS = {
    verbal: ["B", "A", "B", "C", "B"],       // Questions 1-5
    numerik: ["C", "A", "B", "B", "A"],      // Questions 6-10
    klarikal: ["A", "B", "A", "B", "A"],     // Questions 11-15
  };

  const verbalScore = datAnswers.verbal.filter(
    (ans, i) => ans === CORRECT_ANSWERS.verbal[i]
  ).length;

  const numericScore = datAnswers.numerik.filter(
    (ans, i) => ans === CORRECT_ANSWERS.numerik[i]
  ).length;

  const klarikalScore = datAnswers.klarikal.filter(
    (ans, i) => ans === CORRECT_ANSWERS.klarikal[i]
  ).length;

  return {
    verbalScore,
    numericScore,
    klarikalScore,
  };
}

/**
 * STEP 4: Convert DAT Scores to 0-100 scale
 * Each test has 5 questions, so 5 correct = 100%
 */
export function scaleDATScores(scores: {
  verbalScore: number;
  numericScore: number;
  klarikalScore: number;
}): { verbal: number; numeric: number; clerical: number } {
  return {
    verbal: (scores.verbalScore / 5) * 100,
    numeric: (scores.numericScore / 5) * 100,
    clerical: (scores.klarikalScore / 5) * 100,
  };
}

/**
 * STEP 5: Determine Field Type (Saintek or Soshum)
 * Based on RIASEC code
 */
export function determineSuggestedField(riasecCode: string): string {
  // Saintek-oriented codes (Realistic + Investigative dominant)
  const saintekCodes = [
    "RI",
    "IR",
    "RIA",
    "RAI",
    "IRA",
    "IAR",
    "RIC",
    "REC",
    "IRC",
    "IEC",
    "RIS",
  ];

  const isSaintek = saintekCodes.some((code) => riasecCode.includes(code));
  return isSaintek ? "Saintek" : "Soshum";
}

/**
 * STEP 6: Main Server Action - Submit Quiz
 * Validates, calculates, saves, and returns results
 */
export async function submitQuiz(submission: QuizSubmission) {
  try {
    // Validate input
    const validated = QuizSubmissionSchema.parse(submission);

    // Calculate all scores
    const riasecScores = calculateRIASECScores(validated.riasecAnswers);
    const riasecCode = mapToRIASECCode(riasecScores);
    const datScores = calculateDATScores(validated.datAnswers);
    const scaledDatScores = scaleDATScores(datScores);
    const suggestedField = determineSuggestedField(riasecCode);

    // Prepare data for DB insert
    const quizResultData = {
      user_id: validated.userId,
      verbalScore: Math.round(scaledDatScores.verbal),
      numericScore: Math.round(scaledDatScores.numeric),
      klarikalScore: Math.round(scaledDatScores.clerical),
      totalScore: Math.round(
        (scaledDatScores.verbal +
          scaledDatScores.numeric +
          scaledDatScores.clerical) /
          3
      ),
      riasecCode,
      suggestedField,
      riasecScores: JSON.stringify(riasecScores), // Store raw scores
    };

    // Upsert into DB (1:1 mapping per user_id)
    const result = await prisma.quizResult.upsert({
      where: { user_id: validated.userId },
      update: quizResultData,
      create: quizResultData,
    });

    // Revalidate cache
    revalidatePath("/app/hasil-analisis");

    return {
      success: true,
      riasecCode,
      suggestedField,
      scores: {
        verbal: Math.round(scaledDatScores.verbal),
        numeric: Math.round(scaledDatScores.numeric),
        clerical: Math.round(scaledDatScores.clerical),
      },
    };
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Utility: Get user's latest quiz result
 */
export async function getUserQuizResult(userId: string) {
  try {
    const result = await prisma.quizResult.findUnique({
      where: { user_id: userId },
    });
    return result;
  } catch (error) {
    console.error("Error fetching quiz result:", error);
    return null;
  }
}

/**
 * Utility: Parse stored RIASEC scores (JSON)
 */
export function parseRIASECScores(
  scoresJson: string
): Record<string, number> {
  try {
    return JSON.parse(scoresJson);
  } catch {
    return { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  }
}

/**
 * Utility: Calculate score percentages for display
 */
export function calculateRIASECPercentages(scores: Record<string, number>) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const percentages: Record<string, number> = {};

  Object.entries(scores).forEach(([key, value]) => {
    percentages[key] = total > 0 ? Math.round((value / total) * 100) : 0;
  });

  return percentages;
}
```

---

### File 3: `src/app/(app)/quiz/page.tsx` - Quiz UI Integration
**Status**: Update to connect submit logic

```typescript
// src/app/(app)/quiz/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz } from "@/lib/actions/quiz-engine";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth"; // Assuming this exists

// TODO: Import quiz data fetch (from API or component)

export default function QuizPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State for RIASEC section (36 items)
  const [riasecAnswers, setRiasecAnswers] = useState<number[]>(
    new Array(36).fill(-1)
  );
  const [currentRiasecIndex, setCurrentRiasecIndex] = useState(0);

  // State for DAT section (15 items)
  const [datAnswers, setDatAnswers] = useState({
    verbal: new Array(5).fill(""),
    numerik: new Array(5).fill(""),
    klarikal: new Array(5).fill(""),
  });
  const [currentDatIndex, setCurrentDatIndex] = useState(0);

  // State for navigation
  const [section, setSection] = useState<"riasec" | "dat">("riasec");

  // Calculate overall progress
  const riasecProgress = (riasecAnswers.filter((a) => a !== -1).length / 36) * 100;
  const datProgress = (
    (datAnswers.verbal.filter((a) => a).length +
      datAnswers.numerik.filter((a) => a).length +
      datAnswers.klarikal.filter((a) => a).length) /
    15
  ) * 100;

  // Check if quiz is complete
  const isRiasecComplete = riasecAnswers.every((a) => a !== -1);
  const isDatComplete =
    datAnswers.verbal.every((a) => a) &&
    datAnswers.numerik.every((a) => a) &&
    datAnswers.klarikal.every((a) => a);
  const isComplete = isRiasecComplete && isDatComplete;

  // Handle RIASEC answer selection
  const handleRiasecAnswer = (value: number) => {
    const newAnswers = [...riasecAnswers];
    newAnswers[currentRiasecIndex] = value;
    setRiasecAnswers(newAnswers);

    // Auto-advance to next question
    if (currentRiasecIndex < 35) {
      setCurrentRiasecIndex(currentRiasecIndex + 1);
    }
  };

  // Handle DAT answer selection
  const handleDatAnswer = (subtest: "verbal" | "numerik" | "klarikal", value: string) => {
    const newAnswers = { ...datAnswers };
    const subArray = [...newAnswers[subtest]];
    subArray[currentDatIndex] = value;
    newAnswers[subtest] = subArray;
    setDatAnswers(newAnswers);

    // Auto-advance
    if (currentDatIndex < 4) {
      setCurrentDatIndex(currentDatIndex + 1);
    }
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    if (!user?.id) {
      setError("User ID not found");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await submitQuiz({
        riasecAnswers,
        datAnswers,
        userId: user.id,
      });

      if (result.success) {
        // Show success message
        console.log("Quiz submitted successfully:", result);

        // Redirect to results page
        router.push("/app/hasil-analisis");
      } else {
        setError(result.error || "Failed to submit quiz");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Tes Minat & Bakat
        </h1>
        <p className="text-gray-600">
          Jawab semua pertanyaan dengan jujur untuk mendapatkan hasil akurat
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Progress: {Math.round(section === "riasec" ? riasecProgress : datProgress)}%
          </span>
        </div>
        <Progress
          value={section === "riasec" ? riasecProgress : datProgress}
          className="h-2"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* RIASEC Section */}
      {section === "riasec" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">SESI 1 - TES RIASEC</h2>
            <p className="text-sm text-gray-600">
              Soal {currentRiasecIndex + 1} dari 36
            </p>
          </div>

          {/* Question Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <p className="text-lg font-medium text-center">
              {/* TODO: Fetch and display actual question from DB */}
              Placeholder question text here
            </p>

            {/* Radio Options */}
            <div className="space-y-2">
              {["Sangat Tidak Suka", "Tidak Suka", "Biasa Saja", "Suka", "Sangat Suka"].map(
                (label, idx) => (
                  <label key={idx} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="riasec-answer"
                      value={idx}
                      checked={riasecAnswers[currentRiasecIndex] === idx}
                      onChange={() => handleRiasecAnswer(idx)}
                      className="mr-3"
                    />
                    <span>{label}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentRiasecIndex(Math.max(0, currentRiasecIndex - 1))}
              disabled={currentRiasecIndex === 0}
            >
              Sebelumnya
            </Button>

            {isRiasecComplete ? (
              <Button onClick={() => { setSection("dat"); setCurrentDatIndex(0); }}>
                Lanjut ke DAT Test
              </Button>
            ) : (
              <Button
                onClick={() =>
                  setCurrentRiasecIndex(Math.min(35, currentRiasecIndex + 1))
                }
              >
                Selanjutnya
              </Button>
            )}
          </div>
        </div>
      )}

      {/* DAT Section */}
      {section === "dat" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">SESI 2 - DAT TEST</h2>
            <p className="text-sm text-gray-600">
              Soal {currentDatIndex + 1} dari 15
            </p>
          </div>

          {/* TODO: Implement DAT subtest UI (Verbal, Numerik, Klarikal) */}

          {/* Submit Button */}
          {isDatComplete && (
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setSection("riasec")}>
                Kembali ke RIASEC
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Mengirim..." : "Submit & Lihat Hasil"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### File 4: `src/lib/constants/career-map.ts` (RIASEC to Major Mapping)
**Status**: Create - hardcoded for MVP

```typescript
// src/lib/constants/career-map.ts

export const RIASEC_TO_MAJORS = {
  RIA: ["Teknik Informatika", "Sistem Informasi", "Data Science"],
  RAI: ["Arsitektur", "Teknik Sipil", "Desain Grafis"],
  RIS: ["Teknik Mesin", "Kedokteran", "Perawat"],
  RES: ["Teknik Industri", "Manajemen Operasional", "Supply Chain"],
  RCI: ["Ilmu Komputer", "Software Engineering", "Cyber Security"],
  IRA: ["Ilmuwan Data", "Fisikawan", "Ahli Astronomi"],
  IRE: ["Insinyur Peneliti", "Ahli Lingkungan", "Ahli Energi"],
  AIE: ["Desainer UI/UX", "Arsitek Lanskap", "Product Designer"],
  ARE: ["Public Relations", "Jurnalis", "Content Creator"],
  SRI: ["Psikolog Klinis", "Konselor", "Pekerja Sosial"],
  SRE: ["Guru", "Dosen", "Trainer"],
  SAE: ["Promoter Acara", "Event Organizer", "Community Manager"],
  ERI: ["Manager Teknis", "Project Manager", "Business Analyst"],
  EIS: ["Direktur Bisnis", "Entrepreneur", "Investor"],
  CIS: ["Akuntan", "Auditor", "Pajak"],
  CRI: ["Statistikawan", "Analisis Data", "Database Admin"],
};

export const MAJOR_DETAILS = {
  "Teknik Informatika": {
    deskripsi:
      "Program studi yang fokus pada pengembangan software, sistem informasi, dan teknologi komputer modern",
    universitas: ["ITB", "UI", "UGM", "ITS"],
    prospekKarir: ["Software Developer", "System Analyst", "Database Admin", "IT Manager"],
    skillDibutuhkan: ["Programming", "Logic Thinking", "Problem Solving", "Teamwork"],
  },
  "Sistem Informasi": {
    deskripsi:
      "Fokus pada penerapan teknologi informasi untuk solusi bisnis dan manajemen organisasi",
    universitas: ["UI", "UGM", "Telkom", "Gunadarma"],
    prospekKarir: ["Business Analyst", "IT Consultant", "ERP Specialist", "IT Project Manager"],
    skillDibutuhkan: ["Business Understanding", "System Design", "Communication", "Analytics"],
  },
  // Add more as needed for MVP...
};
```

---

## 🧪 Testing Checklist

```
[ ] QuizSubmissionSchema validates correctly
[ ] calculateRIASECScores() produces 0-24 for each domain
[ ] mapToRIASECCode() returns 3-letter code
[ ] calculateDATScores() counts correct answers
[ ] scaleDATScores() converts to 0-100 scale
[ ] determineSuggestedField() classifies correctly
[ ] submitQuiz() server action completes successfully
[ ] Quiz results saved to DB with upsert logic
[ ] User can see "Submit & Lihat Hasil" button only when all questions answered
[ ] Redirect to /hasil-analisis on successful submit
```

---

## 🐛 Common Issues

### Issue 1: "Correct answers don't match DAT questions"
**Fix**: Make sure CORRECT_ANSWERS in calculateDATScores matches seed-data.ts exactly

### Issue 2: "RIASEC code calculation is wrong"
**Fix**: Check that domains are sorted by score DESCENDING, then take top 3

### Issue 3: "User can submit without answering all"
**Fix**: Make Submit button disabled until isComplete === true

---

## ✅ Phase 3.4 Checklist

```
[ ] quiz-schema.ts validates all inputs with Zod
[ ] quiz-engine.ts has all 6 calculation functions
[ ] submitQuiz() server action works & saves to DB
[ ] quiz/page.tsx has submit button integration
[ ] career-map.ts has hardcoded major mappings (MVP)
[ ] All console logs show correct scoring
[ ] Ready to build Hasil Analisis page (Phase 4.1)
```

---

**Next**: After testing locally, proceed to Phase 4.1 (Hasil Analisis Page) 🚀
