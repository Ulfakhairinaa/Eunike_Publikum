'use client'

import { ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, Clock } from 'lucide-react'

interface DATSectionProps {
  questions: any[]
  answers: Record<string, string[]>
  onAnswer: (tipe_soal: string, indexInType: number, value: string) => void
  onSubmit: () => void
  currentIndex: number
  setCurrentIndex: (idx: number) => void
  isPending: boolean
  globalProgress?: number
}

export function DATSection({ questions, answers, onAnswer, onSubmit, currentIndex, setCurrentIndex, isPending }: DATSectionProps) {
  const currentQ = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isLast = currentIndex === questions.length - 1
  
  const questionsOfType = questions.filter(q => q.tipe_soal === currentQ.tipe_soal)
  const indexInType = questionsOfType.findIndex(q => q.id === currentQ.id)
  
  const currentType = currentQ.tipe_soal.toLowerCase()
  const hasAnswered = !!(answers[currentType] && answers[currentType][indexInType])

  const handleNext = () => {
    if (isLast) onSubmit()
    else setCurrentIndex(currentIndex + 1)
  }

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const options = typeof currentQ.pilihan_jawaban === 'string' 
    ? JSON.parse(currentQ.pilihan_jawaban) 
    : currentQ.pilihan_jawaban

  return (
    <div className="w-full space-y-6 max-w-4xl mx-auto">
      
      {/* Header Titles */}
      <div className="text-center space-y-3 mb-8">
        <p className="text-[#3b719f] text-sm font-semibold tracking-widest uppercase">SESI 2 - TES DAT</p>
        <h2 className="text-[32px] font-bold text-[#0B3B60]">Tes Bakat & Kemampuan</h2>
        <p className="text-slate-500 text-base">Jawablah soal berikut dengan tepat dan benar</p>
      </div>

      {/* Local Progress Card */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
        <div className="flex justify-between items-center text-[#0B3B60] font-bold text-[17px]">
          <span>Soal {currentIndex + 1} dari {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-[#E2E8F0] rounded-full h-3">
          <div className="bg-[#0B3B60] h-3 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex px-1">
        <div className="bg-[#ffedd5] text-[#9a3412] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          {currentQ.tipe_soal === 'Verbal' ? 'PENALARAN VERBAL' : currentQ.tipe_soal || 'DAT'}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 flex flex-col">
        <div className="p-8 md:p-10">
          <h3 className="text-[22px] font-bold text-[#0B3B60] mb-8 leading-relaxed">
            {currentQ.teks_soal}
          </h3>

          <div className="space-y-4">
            {options.filter((opt: any) => (opt.label || opt) !== '-').map((opt: any, idx: number) => {
              const val = opt.value || opt 
              const label = opt.label || opt
              const isSelected = answers[currentType]?.[indexInType] === val

              return (
                <div 
                  key={idx}
                  onClick={() => onAnswer(currentType, indexInType, val)}
                  className={`flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all border-2 ${
                    isSelected 
                      ? 'bg-[#f0f7ff] border-[#0B3B60]' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-[2px] flex items-center justify-center transition-colors ${
                      isSelected ? 'border-[#0B3B60]' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-[#0B3B60]" />}
                    </div>
                    <span className={`text-[17px] ${isSelected ? 'text-[#0B3B60]' : 'text-slate-600'}`}>
                      {label}
                    </span>
                  </div>
                  {isSelected && <CheckCircle2 className="text-[#0B3B60]" size={24} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Buttons inside Card */}
        <div className="border-t border-slate-100 p-8 md:px-10 flex items-center justify-between bg-white rounded-b-[20px]">
          <button 
            onClick={handleBack} 
            disabled={currentIndex === 0 || isPending}
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold border-2 transition-all ${
              (currentIndex === 0 || isPending)
                ? 'text-slate-400 border-slate-200 cursor-not-allowed' 
                : 'text-[#0B3B60] border-[#0B3B60] hover:bg-slate-50 active:scale-95'
            }`}
          >
            <ChevronLeft size={20} strokeWidth={2.5} /> Sebelumnya
          </button>
          
          <button 
            onClick={handleNext} 
            disabled={!hasAnswered || isPending}
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
              (!hasAnswered || isPending)
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-[#0B3B60] hover:bg-[#082a45] text-white shadow-sm active:scale-95'
            }`}
          >
            {isLast ? (isPending ? "Memproses..." : "Selesai") : 'Selanjutnya'} {!isLast && <ChevronRight size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-[#ffedd5] rounded-[20px] p-6 border border-[#fed7aa] flex gap-4">
        <Lightbulb className="text-[#9a3412] shrink-0 mt-0.5" size={24} />
        <div>
          <h4 className="text-[#9a3412] font-semibold text-base mb-1">Tip Discovery</h4>
          <p className="text-[#9a3412]/80 text-[15px] leading-relaxed">
            Kerjakan dengan tenang dan fokus. Setiap subtes berbeda jenis soalnya, baca instruksi di tiap bagian dengan teliti.
          </p>
        </div>
      </div>
      
    </div>
  )
}
