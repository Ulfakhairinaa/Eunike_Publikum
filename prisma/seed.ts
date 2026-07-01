import { prisma } from '../src/lib/prisma'
import { RIASEC_QUESTIONS, DAT_QUESTIONS } from './seed-data'

async function main() {
  console.log('Start seeding RIASEC & DAT questions...')

  // Hanya clear dan re-seed data soal asesmen (RIASEC + DAT)
  // Data game missions dikelola terpisah oleh seed-game.ts
  await prisma.userAnswer.deleteMany()
  await prisma.question.deleteMany()

  await prisma.question.createMany({
    data: [...RIASEC_QUESTIONS, ...DAT_QUESTIONS] as any
  })

  console.log(`✅ Seeding selesai: ${RIASEC_QUESTIONS.length + DAT_QUESTIONS.length} soal asesmen (RIASEC + DAT).`)
  console.log('ℹ️  Untuk game missions, jalankan: npm run seed:game')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
