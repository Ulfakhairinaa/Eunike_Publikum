'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { QuizSubmissionSchema, type QuizSubmission } from '@/lib/quiz-schema'

export async function saveAnswerAsync(questionId: string, answer: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  let prismaUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!prismaUser) {
    prismaUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email || 'unknown@email.com',
        name: user.user_metadata?.nama_lengkap || 'User',
        school: '-',
        gender: '-'
      }
    })
  }

  let assessment = await prisma.assessment.findFirst({
    where: { user_id: prismaUser.id, status: 'PENDING' }
  })

  if (!assessment) {
    assessment = await prisma.assessment.create({
      data: {
        user_id: user.id,
        status: 'PENDING'
      }
    })
  }

  await prisma.userAnswer.upsert({
    where: {
      assessment_id_question_id: {
        assessment_id: assessment.id,
        question_id: questionId
      }
    },
    update: {
      answer_text: answer
    },
    create: {
      assessment_id: assessment.id,
      question_id: questionId,
      answer_text: answer
    }
  })

  return { success: true }
}

export async function submitQuizAndCalculate(payload: QuizSubmission) {
  try {
    const parseResult = QuizSubmissionSchema.safeParse(payload)
    if (!parseResult.success) {
      return { success: false, error: 'Invalid payload format' }
    }

    const { answers, userId } = parseResult.data

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return { success: false, error: 'Unauthorized' }
    }

    let prismaUser = await prisma.user.findUnique({ where: { id: user.id } })
    if (!prismaUser) {
      prismaUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || 'unknown@email.com',
          name: user.user_metadata?.nama_lengkap || 'User',
          school: '-',
          gender: '-'
        }
      })
    }

    let assessment = await prisma.assessment.findFirst({
      where: { user_id: prismaUser.id, status: 'PENDING' }
    })

    if (!assessment) {
       assessment = await prisma.assessment.create({
         data: { user_id: user.id, status: 'PENDING' }
       })
    }

    // Fetch all questions to map them securely
    const allQuestions = await prisma.question.findMany()
    const questionMap = new Map(allQuestions.map(q => [q.id, q]))

    const riasecScores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
    let verbalScore = 0
    let numericScore = 0
    let klarikalScore = 0

    // Process each answer safely based on the DB question definition
    for (const item of answers) {
      const q = questionMap.get(item.questionId)
      if (!q) continue

      if (q.type === 'RIASEC' && typeof item.answer === 'number') {
        const category = q.category
        if (riasecScores[category] !== undefined) {
          riasecScores[category] += item.answer
        }
      } else if (q.type === 'DAT' && typeof item.answer === 'string') {
        if (item.answer === q.correct_answer) {
          if (q.category === 'Verbal') verbalScore += q.score_weight || 20
          else if (q.category === 'Numerical') numericScore += q.score_weight || 20
          else if (q.category === 'Clerical') klarikalScore += q.score_weight || 20
        }
      }
    }

    const datScores = {
      Verbal: verbalScore,
      Numerical: numericScore,
      Clerical: klarikalScore
    }

    // --- SAVE RESULTS ---
    await prisma.analysisResult.upsert({
      where: { assessment_id: assessment.id },
      update: {
        riasec_scores: riasecScores,
        dat_scores: datScores,
        createdAt: new Date()
      },
      create: {
        assessment_id: assessment.id,
        riasec_scores: riasecScores,
        dat_scores: datScores,
      }
    })

    await prisma.assessment.update({
      where: { id: assessment.id },
      data: { status: 'COMPLETED' }
    })

    return { success: true }
  } catch (error) {
    console.error('Quiz submission error:', error)
    return { success: false, error: 'Failed to process quiz' }
  }
}