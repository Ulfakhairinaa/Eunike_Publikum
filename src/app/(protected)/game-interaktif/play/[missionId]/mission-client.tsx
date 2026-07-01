'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, AlertCircle, ArrowRight, Star, Trophy, HelpCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

// ─── Poin berdasarkan pilihan ─────────────────────────────────────────────────
const OPTION_POINTS: Record<string, number> = {
  'Sangat Sering': 20,
  'Pernah': 15,
  'Jarang': 10,
  'Belum Pernah': 5,
}

const OPTION_LABELS: Record<string, { label: string; shortLabel: string; color: string; bg: string }> = {
  'Sangat Sering': { label: 'Sangat Sering', shortLabel: 'SS', color: 'text-blue-700', bg: 'bg-blue-600' },
  'Pernah':        { label: 'Pernah',         shortLabel: 'P',  color: 'text-indigo-700', bg: 'bg-indigo-500' },
  'Jarang':        { label: 'Jarang',          shortLabel: 'J',  color: 'text-slate-600', bg: 'bg-slate-400' },
  'Belum Pernah':  { label: 'Belum Pernah',   shortLabel: 'BP', color: 'text-slate-500', bg: 'bg-slate-300' },
}

interface MissionClientProps {
  mission: any
  userId: string
  initialProgress: any
  backUrl: string
}

interface CompletionData {
  score: number
  totalPoints: number
  totalQuestions: number
  nextMission: { id: string; title: string } | null
  passed: boolean
}

// ─── Root wrapper ─────────────────────────────────────────────────────────────
export default function MissionClient({ mission, userId, initialProgress, backUrl }: MissionClientProps) {
  const router = useRouter()
  const [completionData, setCompletionData] = useState<CompletionData | null>(null)

  const handleBack = () => {
    router.push(backUrl)
    router.refresh()
  }

  // Sudah pernah diselesaikan sebelumnya
  if (initialProgress?.status === 'completed' && !completionData) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl border-2 border-blue-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 pointer-events-none" />
        <CardContent className="p-10 text-center space-y-6 relative z-10">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[#0B3B60] flex items-center justify-center shadow-lg">
              <Trophy size={48} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Misi Sudah Diselesaikan</h2>
            <p className="text-slate-500 mt-2">
              Kamu sudah mendapatkan{' '}
              <span className="font-bold text-blue-700">{initialProgress.current_points} poin</span> dari misi ini.
            </p>
          </div>
          <Button onClick={handleBack} className="w-full bg-[#0B3B60] hover:bg-[#072a44] text-white py-6 rounded-xl">
            Kembali ke Daftar Misi
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (completionData) {
    return (
      <CompletionPopup
        data={completionData}
        missionMinPoint={mission.min_point}
        onBack={handleBack}
        onNext={(id: string) => router.push(`/game-interaktif/play/${id}`)}
      />
    )
  }

  return (
    <MissionQuiz
      mission={mission}
      onClose={handleBack}
      onComplete={(data: CompletionData) => setCompletionData(data)}
    />
  )
}

// ─── Quiz Component ───────────────────────────────────────────────────────────
function MissionQuiz({
  mission,
  onClose,
  onComplete,
}: {
  mission: any
  onClose: () => void
  onComplete: (data: CompletionData) => void
}) {
  const questions: any[] = mission.questions
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progressPercent = (currentIndex / questions.length) * 100

  // Ambil 4 opsi dari soal
  const options: string[] = [
    currentQuestion.option_a,
    currentQuestion.option_b,
    currentQuestion.option_c,
    currentQuestion.option_d,
  ]

  const handleNext = async () => {
    if (!selectedOption) return

    // Poin berdasarkan pilihan (SS=20, P=15, J=10, BP=5)
    const addedScore = OPTION_POINTS[selectedOption] ?? 5
    const newScore = score + addedScore

    setScore(newScore)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      return
    }

    // Soal terakhir — submit ke API
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/game/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionId: mission.id, score: newScore }),
      })

      if (res.ok) {
        const json = await res.json()
        onComplete({
          score: newScore,
          totalPoints: json.totalPoints ?? newScore,
          totalQuestions: questions.length,
          nextMission: json.nextMission ?? null,
          passed: true, // Sistem SS/P/J/BP: semua submission selalu selesai
        })
      } else {
        console.error('Submit gagal:', await res.text())
      }
    } catch (error) {
      console.error('Error submitting mission:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 flex flex-col relative overflow-hidden">
      {/* Header */}
      <CardHeader className="border-b bg-slate-50 pb-4 pt-6 px-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">CAREER ADVENTURE</div>
            <CardTitle className="text-xl text-slate-800">{mission.title}</CardTitle>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Soal {currentIndex + 1} dari {questions.length}</span>
            <span>{Math.round(progressPercent)}% Selesai</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </CardHeader>

      {/* Question */}
      <CardContent className="p-8 space-y-6 flex-1">
        {/* Petunjuk poin */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {Object.entries(OPTION_POINTS).map(([opt, pts]) => {
            const meta = OPTION_LABELS[opt]
            return (
              <span key={opt} className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                <span className={`w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${meta.bg}`}>
                  {meta.shortLabel}
                </span>
                = {pts} poin
              </span>
            )
          })}
        </div>

        {/* Skenario / pertanyaan */}
        <div className="bg-blue-50/60 p-6 rounded-xl border border-blue-100 text-center">
          <h3 className="text-lg font-medium text-slate-800 leading-relaxed">{currentQuestion.scenario_text}</h3>
        </div>

        {/* Opsi pilihan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt
            const meta = OPTION_LABELS[opt] ?? { label: opt, shortLabel: '?', color: 'text-slate-600', bg: 'bg-slate-400' }
            const pts = OPTION_POINTS[opt] ?? 5

            return (
              <button
                key={opt}
                onClick={() => setSelectedOption(opt)}
                className={`p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
                  isSelected
                    ? 'border-[#0B3B60] bg-blue-50'
                    : 'border-slate-200 hover:border-[#0B3B60]/40 hover:bg-slate-50'
                }`}
              >
                {/* Badge poin */}
                <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? `${meta.bg} text-white` : 'bg-slate-100'
                }`}>
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-white' : meta.color}`}>
                    {meta.shortLabel}
                  </span>
                  <span className={`text-sm font-black ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                    {pts}
                  </span>
                </div>

                {/* Label */}
                <span className={`font-semibold text-sm ${isSelected ? 'text-[#0B3B60]' : 'text-slate-600'}`}>
                  {meta.label}
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-6 border-t bg-slate-50 flex justify-between items-center">
        <Button variant="ghost" onClick={onClose} className="text-slate-500 hover:text-slate-800">
          Batal
        </Button>

        <div className="flex items-center gap-3">
          {/* Preview poin yang akan didapat */}
          {selectedOption && (
            <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg">
              +{OPTION_POINTS[selectedOption] ?? 5} poin
            </span>
          )}
          <Button
            onClick={handleNext}
            disabled={!selectedOption || isSubmitting}
            className="bg-[#0B3B60] hover:bg-[#072a44] text-white px-8"
          >
            {isSubmitting
              ? 'Memproses...'
              : currentIndex < questions.length - 1
              ? 'Selanjutnya'
              : 'Selesai'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// ─── Completion Popup ─────────────────────────────────────────────────────────
function CompletionPopup({
  data,
  missionMinPoint,
  onBack,
  onNext,
}: {
  data: CompletionData
  missionMinPoint: number
  onBack: () => void
  onNext: (id: string) => void
}) {
  const { score, totalPoints, totalQuestions, nextMission, passed } = data
  const maxPossible = totalQuestions * 20

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Top section */}
        <div className={`relative px-8 pt-10 pb-6 text-center ${passed ? 'bg-gradient-to-b from-blue-50 to-white' : 'bg-gradient-to-b from-orange-50 to-white'}`}>
          {passed && (
            <>
              <Star size={16} className="absolute top-6 left-12 text-yellow-400 fill-yellow-400 animate-pulse" />
              <Star size={10} className="absolute top-10 right-16 text-yellow-300 fill-yellow-300 animate-pulse delay-150" />
              <Star size={12} className="absolute top-5 right-24 text-yellow-400 fill-yellow-400 animate-pulse delay-300" />
            </>
          )}

          {/* Badge */}
          <div className="relative inline-flex mx-auto mb-4">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${
              passed ? 'bg-gradient-to-br from-[#1a4d7c] to-[#0B3B60]' : 'bg-gradient-to-br from-orange-400 to-orange-600'
            }`}>
              {passed ? <Trophy size={44} className="text-white" /> : <AlertCircle size={44} className="text-white" />}
            </div>
            {passed && (
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                <Star size={14} className="text-white fill-white" />
              </div>
            )}
          </div>

          <h2 className={`text-2xl font-bold ${passed ? 'text-[#0B3B60]' : 'text-orange-700'}`}>
            {passed ? 'Mission Completed!' : 'Misi Selesai!'}
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
            {passed
              ? 'Luar biasa! Kamu selangkah lebih dekat dengan karier impianmu.'
              : 'Tetap semangat! Tiap jawaban mencerminkan pengalamanmu yang nyata.'}
          </p>
        </div>

        {/* Stats */}
        <div className="px-8 pb-8">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">

            {/* Score utama */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">POIN DIPEROLEH</div>
                <div className={`text-3xl font-black ${passed ? 'text-[#0B3B60]' : 'text-orange-500'}`}>
                  +{score} Poin
                </div>
                <div className="text-xs text-slate-400 mt-0.5">dari maks {maxPossible} poin</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">SOAL DIJAWAB</div>
                <div className="text-lg font-bold text-slate-700">{totalQuestions}/{totalQuestions}</div>
                <div className="text-xs text-slate-400 mt-0.5">semua terjawab</div>
              </div>
            </div>

            {/* Score bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Skor misi ini</span>
                <span className="font-semibold text-slate-700">{score}/{maxPossible}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-700 ease-out ${passed ? 'bg-[#0B3B60]' : 'bg-orange-400'}`}
                  style={{ width: `${Math.round((score / maxPossible) * 100)}%` }}
                />
              </div>
            </div>

            {/* XP Progress */}
            <div className="space-y-1.5 pt-1 border-t border-slate-200">
              <div className="flex justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">📈 Total XP kamu</span>
                <span className="font-semibold text-[#0B3B60]">{totalPoints} / 1000 XP</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-[#0B3B60] transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((totalPoints / 1000) * 100, 100)}%` }}
                />
              </div>
              <div className="text-right text-[10px] text-slate-400">to Senior Explorer</div>
            </div>
          </div>

          {/* Keterangan sistem poin */}
          <div className="mt-4 flex justify-center gap-3 flex-wrap">
            {Object.entries(OPTION_POINTS).map(([opt, pts]) => {
              const meta = OPTION_LABELS[opt]
              return (
                <span key={opt} className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                  <span className={`w-4 h-4 rounded-full text-white text-[8px] font-bold flex items-center justify-center ${meta.bg}`}>
                    {meta.shortLabel}
                  </span>
                  {pts} poin
                </span>
              )
            })}
          </div>

          {/* Buttons */}
          <div className="mt-5 space-y-3">
            {passed && nextMission && (
              <Button
                onClick={() => onNext(nextMission.id)}
                className="w-full bg-[#0B3B60] hover:bg-[#072a44] text-white font-semibold py-6 text-base rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                Lanjut ke Misi Berikutnya <ArrowRight size={18} />
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onBack}
              className="w-full border-2 border-slate-200 text-slate-700 font-semibold py-6 text-base rounded-xl hover:bg-slate-50 transition-all"
            >
              Kembali ke Daftar Misi
            </Button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
            <HelpCircle size={11} />
            Jawaban mencerminkan pengalamanmu — tidak ada yang salah!
          </p>
        </div>
      </div>
    </div>
  )
}
