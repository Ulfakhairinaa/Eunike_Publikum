'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { submitQuizAndCalculate, saveAnswerAsync } from '@/lib/actions/quiz-engine'
import { RIASECSection } from './riasec-section'
import { DATSection } from './dat-section'

export interface QuizQuestion {
  id: string
  teks_soal: string
  pilihan_jawaban: any
  tipe_soal: string
}

export default function QuizClient({ questions, userId }: { questions: QuizQuestion[], userId: string }) {
  const [currentSection, setCurrentSection] = useState<'RIASEC' | 'DAT'>('RIASEC')
  
  // State is now mapped by questionId directly
  const [answersMap, setAnswersMap] = useState<Record<string, string | number>>({})

  // UI tracking states
  const riasecQuestions = questions.filter(q => q.tipe_soal === 'RIASEC')
  const datQuestions = questions.filter(q => q.tipe_soal !== 'RIASEC')
  const [riasecIndex, setRiasecIndex] = useState(0)
  const [datIndex, setDatIndex] = useState(0)

  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (!questions || questions.length === 0) {
    return <div className="text-center p-10">Belum ada soal yang tersedia di database.</div>
  }

  const handleAnswer = async (questionId: string, value: string | number) => {
    // 1. Save in local state
    setAnswersMap(prev => ({ ...prev, [questionId]: value }))

    // 2. Save asynchronously to database (FR-2)
    // Convert numbers to string for DB storage if needed, or rely on DB schema which expects string
    await saveAnswerAsync(questionId, value.toString())
  }

  // To support existing UI components which expect array indexes, we build adapter props
  const riasecAnswersArray = riasecQuestions.map(q => answersMap[q.id] as number | undefined)
  
  const datAnswersObject: Record<string, string[]> = {
    verbal: datQuestions.filter(q => q.tipe_soal === 'Verbal').map(q => answersMap[q.id] as string || ""),
    numerical: datQuestions.filter(q => q.tipe_soal === 'Numerical').map(q => answersMap[q.id] as string || ""),
    clerical: datQuestions.filter(q => q.tipe_soal === 'Clerical').map(q => answersMap[q.id] as string || ""),
  }

  const handleSubmit = () => {
    // Construct robust payload
    const payloadAnswers = Object.entries(answersMap).map(([questionId, answer]) => ({
      questionId,
      answer
    }))

    const payload = {
      answers: payloadAnswers,
      userId
    }

    startTransition(async () => {
      const result = await submitQuizAndCalculate(payload)
      if (result.success) {
        router.refresh()
        router.push('/hasil-analisis')
      } else {
        alert("Terjadi kesalahan saat memproses hasil kuis. Pastikan Anda sudah login.")
      }
    })
  }

  if (currentSection === 'RIASEC') {
    return (
      <RIASECSection
        questions={riasecQuestions}
        answers={riasecAnswersArray as number[]}
        onAnswer={(idx, val) => handleAnswer(riasecQuestions[idx].id, val)}
        onComplete={() => setCurrentSection('DAT')}
        currentIndex={riasecIndex}
        setCurrentIndex={setRiasecIndex}
      />
    )
  }

  return (
    <DATSection
      questions={datQuestions}
      answers={datAnswersObject}
      onAnswer={(tipe_soal, indexInType, val) => {
        // Need to map back to questionId
        const typeQuestions = datQuestions.filter(q => q.tipe_soal.toLowerCase() === tipe_soal.toLowerCase())
        const targetQ = typeQuestions[indexInType]
        if (targetQ) handleAnswer(targetQ.id, val)
      }}
      onSubmit={handleSubmit}
      currentIndex={datIndex}
      setCurrentIndex={setDatIndex}
      isPending={isPending}
    />
  )
}
