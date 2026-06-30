'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

interface DATSectionProps {
  questions: any[]
  answers: Record<string, string[]>
  onAnswer: (tipe_soal: string, indexInType: number, value: string) => void
  onSubmit: () => void
  currentIndex: number
  setCurrentIndex: (idx: number) => void
  isPending: boolean
}

export function DATSection({ questions, answers, onAnswer, onSubmit, currentIndex, setCurrentIndex, isPending }: DATSectionProps) {
  const currentQ = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100
  const isLast = currentIndex === questions.length - 1
  
  // Find which index this question is within its type
  const questionsOfType = questions.filter(q => q.tipe_soal === currentQ.tipe_soal)
  const indexInType = questionsOfType.findIndex(q => q.id === currentQ.id)
  
  const currentType = currentQ.tipe_soal.toLowerCase() // verbal, numerik, klarikal
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
    <div className="max-w-3xl mx-auto w-full space-y-8 p-4 py-10">
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-semibold text-slate-500">
          <span>Sesi 2: Tes Bakat - {currentQ.tipe_soal} (Soal {currentIndex + 1} dari {questions.length})</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full h-3" />
      </div>

      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-slate-50 border-b">
          <CardDescription className="text-primary font-medium tracking-wider uppercase text-xs">
            {currentQ.tipe_soal} Reasoning
          </CardDescription>
          <CardTitle className="text-xl leading-relaxed pt-2">{currentQ.teks_soal}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <RadioGroup 
            value={answers[currentType]?.[indexInType] || ""} 
            onValueChange={(val) => onAnswer(currentType, indexInType, val)}
            className="space-y-3"
          >
            {options.map((opt: any, idx: number) => {
              const val = opt.value || opt // Handle both {value, label} and simple strings
              const label = opt.label || opt
              return (
                <label key={idx} htmlFor={`opt-${idx}`} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer">
                  <RadioGroupItem value={val} id={`opt-${idx}`} className="w-5 h-5" />
                  <span className="flex-1 cursor-pointer font-medium text-base text-slate-700">
                    {label}
                  </span>
                </label>
              )
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between bg-slate-50 border-t p-6">
          <Button size="lg" variant="outline" onClick={handleBack} disabled={currentIndex === 0 || isPending}>
            Kembali
          </Button>
          <Button size="lg" onClick={handleNext} disabled={!hasAnswered || isPending}>
            {isLast ? (isPending ? "Memproses..." : "Selesai & Lihat Hasil") : "Selanjutnya"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
