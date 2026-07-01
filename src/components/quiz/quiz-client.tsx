'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { submitQuizAndCalculate, saveAnswerAsync } from '@/lib/actions/quiz-engine'
import { RIASECSection } from './riasec-section'
import { DATSection } from './dat-section'
import { Bell, ChevronDown } from 'lucide-react'

export interface QuizQuestion {
  id: string
  teks_soal: string
  pilihan_jawaban: any
  tipe_soal: string
}

export default function QuizClient({ questions, userId, userName = 'Siswa' }: { questions: QuizQuestion[], userId: string, userName?: string }) {
  const [currentSection, setCurrentSection] = useState<'RIASEC' | 'DAT'>('RIASEC')
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
    setAnswersMap(prev => ({ ...prev, [questionId]: value }))
    await saveAnswerAsync(questionId, value.toString())
  }

  const riasecAnswersArray = riasecQuestions.map(q => answersMap[q.id] as number | undefined)
  
  const datAnswersObject: Record<string, string[]> = {
    verbal: datQuestions.filter(q => q.tipe_soal === 'Verbal').map(q => answersMap[q.id] as string || ""),
    numerical: datQuestions.filter(q => q.tipe_soal === 'Numerical').map(q => answersMap[q.id] as string || ""),
    clerical: datQuestions.filter(q => q.tipe_soal === 'Clerical').map(q => answersMap[q.id] as string || ""),
  }

  const handleSubmit = () => {
    const payloadAnswers = Object.entries(answersMap).map(([questionId, answer]) => ({
      questionId,
      answer
    }))

    startTransition(async () => {
      const result = await submitQuizAndCalculate({ answers: payloadAnswers, userId })
      if (result.success) {
        router.refresh()
        router.push('/hasil-analisis')
      } else {
        alert("Terjadi kesalahan saat memproses hasil kuis. Pastikan Anda sudah login.")
      }
    })
  }

  // Calculate Global Progress
  const totalQuestions = questions.length
  const answeredCount = Object.keys(answersMap).length
  const globalProgress = Math.round((answeredCount / totalQuestions) * 100)
  const remainingQuestions = totalQuestions - answeredCount
  const estimatedTime = Math.ceil(remainingQuestions * (15 / 60)) // Rough estimate: 15 seconds per question

  const firstName = userName.split(' ')[0]
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (globalProgress / 100) * circumference

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      {/* Topbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 h-[72px] flex items-center justify-between px-8 shrink-0">
        <h1 className="text-xl font-bold text-[#0B3B60]">Tes Minat & Bakat</h1>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#1a4b8c] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">{firstName}</span>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content (Left) */}
          <div className="flex-1 w-full">
            {currentSection === 'RIASEC' ? (
              <RIASECSection
                questions={riasecQuestions}
                answers={riasecAnswersArray as number[]}
                onAnswer={(idx, val) => handleAnswer(riasecQuestions[idx].id, val)}
                onComplete={() => setCurrentSection('DAT')}
                currentIndex={riasecIndex}
                setCurrentIndex={setRiasecIndex}
                globalProgress={globalProgress}
              />
            ) : (
              <DATSection
                questions={datQuestions}
                answers={datAnswersObject}
                onAnswer={(tipe_soal, indexInType, val) => {
                  const typeQuestions = datQuestions.filter(q => q.tipe_soal.toLowerCase() === tipe_soal.toLowerCase())
                  const targetQ = typeQuestions[indexInType]
                  if (targetQ) handleAnswer(targetQ.id, val)
                }}
                onSubmit={handleSubmit}
                currentIndex={datIndex}
                setCurrentIndex={setDatIndex}
                isPending={isPending}
                globalProgress={globalProgress}
              />
            )}
          </div>

          {/* Progress Card (Right) */}
          <div className="w-full lg:w-[320px] shrink-0 sticky top-28 hidden lg:block">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center">
              <h3 className="text-slate-700 font-medium mb-8">Progres Kamu</h3>
              
              <div className="relative w-[140px] h-[140px] mb-8 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#0B3B60"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[#0B3B60] text-2xl font-bold">{globalProgress}%</span>
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest mt-1">SELESAI</span>
                </div>
              </div>

              <div className="flex w-full gap-3">
                <div className="flex-1 bg-[#F1F5F9]/60 rounded-xl p-3 flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-500 font-medium mb-1">Tersisa</span>
                  <span className="text-[#1a4b8c] font-bold text-lg">{remainingQuestions}</span>
                  <span className="text-xs text-[#1a4b8c] mt-0.5">Pertanyaan</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
