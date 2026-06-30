import { z } from 'zod';

export const AnswerSchema = z.object({
  questionId: z.string().min(1),
  answer: z.union([z.string(), z.number()])
});

export const QuizSubmissionSchema = z.object({
  answers: z.array(AnswerSchema),
  userId: z.string().min(1)
});

export type QuizSubmission = z.infer<typeof QuizSubmissionSchema>;