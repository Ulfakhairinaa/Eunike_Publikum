'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trophy, HelpCircle, Flag, Award, Star, TrendingUp, ArrowRight } from 'lucide-react'

// Poin berdasarkan pilihan
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

interface MissionPlayModalProps {
  mission: any
  isOpen: boolean
  onClose: () => void
  onSuccess: (score: number) => void
  totalPoints?: number
  onNextMission?: () => void
}

const getRankDetails = (xp: number) => {
  if (xp < 500) return { current: 'Explorer', next: 'Senior Explorer', nextThreshold: 500 }
  if (xp < 1000) return { current: 'Senior Explorer', next: 'Master Explorer', nextThreshold: 1000 }
  if (xp < 2500) return { current: 'Master Explorer', next: 'Grandmaster', nextThreshold: 2500 }
  return { current: 'Grandmaster', next: 'Legend', nextThreshold: 5000 }
}

export function MissionPlayModal({ mission, isOpen, onClose, onSuccess, totalPoints = 0, onNextMission }: MissionPlayModalProps) {
  const router = useRouter()
  const questions: any[] = mission?.questions || []
  // Target Poin: Easy=20, Medium=30, Hard=40
  const passingScore = mission?.level === 1 ? 20 : mission?.level === 2 ? 30 : 40
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completionData, setCompletionData] = useState<{ passed: boolean; score: number } | null>(null)

  // Reset state when opening a new mission
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      setTimeout(() => {
        setCurrentIndex(0)
        setSelectedOption(null)
        setScore(0)
        setIsSubmitting(false)
        setCompletionData(null)
      }, 300)
    }
  }

  if (!mission) return null

  const currentQuestion = questions[currentIndex]
  const progressPercent = questions.length > 0 ? (currentIndex / questions.length) * 100 : 0

  const handleNext = async () => {
    if (!selectedOption) return

    const addedScore = OPTION_POINTS[selectedOption] ?? 5
    const newScore = score + addedScore

    setScore(newScore)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      return
    }

    // Submit to API
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/game/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionId: mission.id, score: newScore }),
      })

      if (res.ok) {
        // Harus mencapai nilai persis sama dengan passingScore (skor sempurna)
        const passed = newScore === passingScore
        setCompletionData({ passed, score: newScore })
        if (passed) onSuccess(newScore)
      } else {
        alert("Terjadi kesalahan saat menyimpan progres misi.")
      }
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan koneksi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white border-2 border-slate-200">
        
        {completionData ? (
          completionData.passed ? (
            <div className="bg-white text-center rounded-[24px] overflow-hidden flex flex-col relative w-full border-none">
              <div className="p-10 pb-6 flex flex-col items-center">
                {/* Badge Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award size={40} className="text-[#0B3B60]" />
                  </div>
                  {/* Decorative stars */}
                  <Star size={16} className="absolute -top-2 -right-4 text-orange-400 fill-orange-400" />
                  <Star size={12} className="absolute top-4 -left-6 text-blue-400 fill-transparent" />
                </div>
                
                <h2 className="text-[28px] font-bold text-[#0B3B60] mb-2 tracking-tight">Mission Completed</h2>
                <p className="text-slate-600 text-[15px] max-w-[280px] mb-8 leading-relaxed">
                  Luar biasa! Kamu selangkah lebih dekat dengan karier impianmu.
                </p>

                {/* Score Card */}
                <div className="bg-[#eff3f9] rounded-xl p-5 w-full mb-8">
                  <div className="flex justify-between items-start mb-4 text-left">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Points Earned</div>
                      <div className="text-[26px] font-bold text-[#0B3B60]">+{completionData.score} Poin</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Performance</div>
                      <div className="text-[15px] font-bold text-slate-800">{questions.length}/{questions.length} Questions Correct</div>
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="mt-4 border-t border-blue-200/50 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                        <TrendingUp size={14} /> Rank Progress
                      </div>
                      <div className="text-[11px] font-bold text-[#0B3B60]">
                        {totalPoints} / {getRankDetails(totalPoints).nextThreshold} XP to {getRankDetails(totalPoints).next}
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-blue-200/50 rounded-full overflow-hidden p-[2px]">
                      <div className="h-full bg-[#0B3B60] rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min((totalPoints / getRankDetails(totalPoints).nextThreshold) * 100, 100)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="w-full space-y-3">
                  <Button 
                    onClick={() => {
                      handleOpenChange(false)
                      if (onNextMission) {
                        setTimeout(() => onNextMission(), 300)
                      }
                    }} 
                    className="w-full bg-[#0B3B60] hover:bg-[#072a44] text-white py-[26px] text-[15px] font-bold flex items-center justify-center gap-2 rounded-xl"
                  >
                    Lanjut ke Misi Berikutnya <ArrowRight size={18} />
                  </Button>
                  <Button 
                    onClick={() => handleOpenChange(false)} 
                    variant="outline" 
                    className="w-full py-[26px] text-[15px] font-bold border-2 border-[#0B3B60] text-[#0B3B60] hover:bg-slate-50 rounded-xl"
                  >
                    Kembali ke Daftar Misi
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#e4ebf5] py-4 flex items-center justify-center gap-3 w-full">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-[#e4ebf5] flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-400 border-2 border-[#e4ebf5] flex items-center justify-center text-[9px] font-bold text-white z-10">
                    +12
                  </div>
                </div>
                <span className="text-[12px] text-slate-600 font-medium">12 other students just finished this mission</span>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center space-y-6 bg-gradient-to-b from-blue-50 to-white">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg bg-red-500">
                  <Trophy size={48} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Misi Gagal
                </h2>
                <p className="text-slate-500 mt-2">
                  Kamu mendapatkan <span className="font-bold text-red-500">{completionData.score} poin</span>.
                </p>
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mt-4 text-sm text-left">
                  <p className="font-bold mb-1">❌ Misi Gagal: Skor Belum Sempurna!</p>
                  <p>Kamu harus mencapai tepat <strong>{passingScore} poin</strong> (tidak kurang dan tidak lebih) untuk menyelesaikan misi ini. Silakan coba lagi dan pastikan setiap langkahmu tepat sasaran!</p>
                </div>
              </div>
              <div className="pt-4 flex gap-3 justify-center">
                <Button onClick={() => handleOpenChange(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 w-full py-6 text-[15px] font-bold rounded-xl">
                  Tutup
                </Button>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-[#0B3B60] text-white p-6 relative">
              <h2 className="text-xl font-bold">{mission.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-blue-100">
                <span className="flex items-center gap-1"><HelpCircle size={14}/> {questions.length} Pertanyaan</span>
                <span className="flex items-center gap-1"><Flag size={14}/> Lulus: {passingScore} Poin</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100 relative">
              <div className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>

            {/* Question Body */}
            {currentQuestion ? (
              <div className="p-8 space-y-8">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Pertanyaan {currentIndex + 1} dari {questions.length}
                  </span>
                  <p className="text-lg font-medium text-slate-800 leading-relaxed">
                    {currentQuestion.scenario_text}
                  </p>
                </div>

                <div className="space-y-3">
                  {['Sangat Sering', 'Pernah', 'Jarang', 'Belum Pernah'].map((opt) => {
                    const isSelected = selectedOption === opt
                    const labelData = OPTION_LABELS[opt]
                    return (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                          isSelected ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>{opt}</span>
                        {isSelected && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${labelData.bg}`}>
                            {labelData.shortLabel}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                <Button 
                  onClick={handleNext} 
                  disabled={!selectedOption || isSubmitting}
                  className="w-full bg-[#0B3B60] hover:bg-[#072a44] text-white py-6"
                >
                  {isSubmitting ? 'Memproses...' : currentIndex < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Selesaikan Misi'}
                </Button>
              </div>
            ) : (
               <div className="p-8 text-center text-slate-500">Pertanyaan tidak ditemukan.</div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
