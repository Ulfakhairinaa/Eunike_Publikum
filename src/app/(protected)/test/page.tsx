import { prisma } from '@/lib/prisma'
import QuizClient, { QuizQuestion } from '@/components/quiz/quiz-client'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function getQuestions(): Promise<QuizQuestion[]> {
  const questions = await prisma.question.findMany({
    orderBy: { type: 'desc' } // RIASEC first, then DAT
  })

  return questions.map(q => {
    let choices: any = []
    if (q.type === 'DAT') {
      choices = [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean)
    } else if (q.type === 'RIASEC') {
      choices = [
        { value: "1", label: "Sangat Tidak Suka" },
        { value: "2", label: "Tidak Suka" },
        { value: "3", label: "Biasa Saja" },
        { value: "4", label: "Suka" },
        { value: "5", label: "Sangat Suka" }
      ]
    }

    return {
      id: q.id,
      teks_soal: q.question_text,
      tipe_soal: q.type === 'DAT' ? q.category : 'RIASEC',
      pilihan_jawaban: choices
    }
  })
}

export default async function TestPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  return (
    <div className="flex flex-col min-h-full">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full space-y-4 py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Memuat soal kuis...</p>
        </div>
      }>
        <QuizLoader userId={user.id} />
      </Suspense>
    </div>
  )
}

async function QuizLoader({ userId }: { userId: string }) {
  const questions = await getQuestions()
  return <QuizClient questions={questions} userId={userId} />
}
