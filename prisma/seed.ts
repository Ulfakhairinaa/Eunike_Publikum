import { prisma } from '../src/lib/prisma'
import { RIASEC_QUESTIONS, DAT_QUESTIONS } from './seed-data'

async function main() {
  console.log('Start seeding...')



  // 1. Seed 51 Questions (36 RIASEC + 15 DAT)
  await prisma.question.createMany({
    data: [...RIASEC_QUESTIONS, ...DAT_QUESTIONS] as any
  })

  // 2. Seed Majors and Profiles (Gamification & Rekomendasi)
  const majorTI = await prisma.major.create({
    data: {
      name: 'Teknik Informatika',
      description: 'Program studi yang mempelajari dan menerapkan prinsip ilmu komputer dan analisis matematika untuk desain, pengembangan, pengujian, dan evaluasi sistem operasi, perangkat lunak, dan kinerja komputer.',
      profiles: {
        create: {
          ideal_riasec: { I: 25, R: 20, C: 15, S: 5, E: 10, A: 10 },
          ideal_dat: { Numerical: 80, Verbal: 60, Clerical: 70 }
        }
      }
    }
  })

  const majorPsikologi = await prisma.major.create({
    data: {
      name: 'Psikologi',
      description: 'Ilmu yang mempelajari tingkah laku manusia dan proses mentalnya.',
      profiles: {
        create: {
          ideal_riasec: { S: 30, I: 20, A: 15, E: 15, C: 10, R: 5 },
          ideal_dat: { Numerical: 50, Verbal: 80, Clerical: 60 }
        }
      }
    }
  })

  // 3. Seed Game Missions (Eksplorasi)
  const mission1 = await prisma.gameMission.create({
    data: {
      major_id: majorTI.id,
      title: 'Misi 1: Dasar Pemrograman',
      level: 1,
      min_point: 50,
      questions: {
        create: [
          { scenario_text: 'Kamu mendapat error "Null Reference Exception". Apa yang kamu periksa pertama kali?', option_a: 'Variabel yang belum diinisialisasi', option_b: 'Koneksi database', option_c: 'CSS Styling', option_d: 'Hardware RAM', correct_option: 'Variabel yang belum diinisialisasi', points: 50 },
          { scenario_text: 'Klien ingin tombol menjadi warna biru. Apa yang kamu ubah?', option_a: 'HTML', option_b: 'CSS', option_c: 'JavaScript', option_d: 'Database', correct_option: 'CSS', points: 50 }
        ]
      }
    }
  })

  const mission2 = await prisma.gameMission.create({
    data: {
      major_id: majorTI.id,
      title: 'Misi 2: Database Design',
      level: 2,
      min_point: 50,
      questions: {
        create: [
          { scenario_text: 'Bagaimana cara mencegah duplikasi email saat registrasi?', option_a: 'Set field UNIQUE di database', option_b: 'Sembunyikan form', option_c: 'Gunakan CSS', option_d: 'Biarkan saja', correct_option: 'Set field UNIQUE di database', points: 100 }
        ]
      }
    }
  })

  console.log('Seeding finished. 51 Questions and Gamification logic added.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
