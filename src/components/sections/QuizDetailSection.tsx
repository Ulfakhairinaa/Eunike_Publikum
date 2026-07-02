'use client'

import React from 'react'
import { Card, CardContent, Button, Skeleton } from '@/components/ui'

interface OpsiJawaban {
  id: string
  teks: string
  skor: number
}

interface Question {
  id: string
  teks: string
  opsi_jawaban: OpsiJawaban[]
}

interface Quiz {
  id: string
  judul: string
  deskripsi: string
  total_pertanyaan: number
}

interface QuizDetailSectionProps {
  quiz: Quiz | null
  questions: Question[]
  currentQuestionIndex: number
  answers: Record<string, string>
  isLoading?: boolean
  onSelectAnswer: (opsiId: string) => void
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
}

export const QuizDetailSection = ({
  quiz,
  questions,
  currentQuestionIndex,
  answers,
  isLoading,
  onSelectAnswer,
  onNext,
  onPrev,
  onSubmit,
}: QuizDetailSectionProps) => {
  if (isLoading || !quiz) {
    return (
      <div className="min-h-screen bg-secondary-50 p-6">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-64 mb-6" />
          <Card>
            <CardContent className="p-8">
              <Skeleton className="h-6 mb-8" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16" />)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100)
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined

  return (
    <div className="min-h-screen bg-secondary-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">{quiz.judul}</h1>
            <p className="text-secondary-600 mt-1">
              Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-secondary-200 rounded-full h-2.5 mb-8">
          <div 
            className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-xl font-medium text-secondary-900 mb-8 leading-relaxed">
              {currentQuestion?.teks}
            </h2>

            <div className="space-y-4">
              {currentQuestion?.opsi_jawaban?.map((opsi) => {
                const isSelected = currentAnswer === opsi.id
                
                return (
                  <button
                    key={opsi.id}
                    onClick={() => onSelectAnswer(opsi.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-secondary-200 hover:border-primary-300 hover:bg-secondary-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center ${
                        isSelected ? 'border-primary-500' : 'border-secondary-300'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                      </div>
                      <span className={`text-base ${isSelected ? 'text-primary-900 font-medium' : 'text-secondary-700'}`}>
                        {opsi.teks}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex justify-between mt-12 pt-6 border-t border-secondary-200">
              <Button
                variant="outline"
                onClick={onPrev}
                disabled={currentQuestionIndex === 0}
              >
                Sebelumnya
              </Button>

              {isLastQuestion ? (
                <Button 
                  variant="default" 
                  onClick={onSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  Selesai & Lihat Hasil
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  onClick={onNext}
                  disabled={!currentAnswer}
                >
                  Selanjutnya
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
