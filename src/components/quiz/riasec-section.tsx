'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

interface RIASECSectionProps {
  questions: any[]
  answers: number[]
  onAnswer: (index: number, value: number) => void
  onComplete: () => void
  currentIndex: number
  setCurrentIndex: (idx: number) => void
}

export function RIASECSection({ questions, answers, onAnswer, onComplete, currentIndex, setCurrentIndex }: RIASECSectionProps) {
  const currentQ = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100
  const isLast = currentIndex === questions.length - 1
  const hasAnswered = answers[currentIndex] !== undefined

  const handleNext = () => {
    if (isLast) onComplete()
    else setCurrentIndex(currentIndex + 1)
  }

  const options = typeof currentQ.pilihan_jawaban === 'string' 
    ? JSON.parse(currentQ.pilihan_jawaban) 
    : currentQ.pilihan_jawaban

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8 p-4 py-10">
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-semibold text-slate-500">
          <span>Sesi 1: Kepribadian (Soal {currentIndex + 1} dari {questions.length})</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full h-3" />
      </div>

      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-slate-50 border-b">
          <CardDescription className="text-primary font-medium tracking-wider uppercase text-xs">
            Eksplorasi Minat
          </CardDescription>
          <CardTitle className="text-xl leading-relaxed pt-2">Seberapa Anda suka: {currentQ.teks_soal}?</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <RadioGroup 
            value={answers[currentIndex]?.toString() ?? ""} 
            onValueChange={(val) => {
              onAnswer(currentIndex, parseInt(val))
            }}
            className="space-y-3"
          >
            {options.map((opt: any) => (
              <label key={opt.value} htmlFor={`opt-${opt.value}`} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer">
                <RadioGroupItem value={opt.value} id={`opt-${opt.value}`} className="w-5 h-5" />
                <span className="flex-1 cursor-pointer font-medium text-base text-slate-700">
                  {opt.label}
                </span>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between bg-slate-50 border-t p-6">
          <Button variant="outline" size="lg" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="w-full sm:w-auto mr-4">
            Sebelumnya
          </Button>
          <Button size="lg" onClick={handleNext} disabled={!hasAnswered} className="w-full sm:w-auto">
            {isLast ? "Lanjut ke Sesi 2" : "Selanjutnya"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
