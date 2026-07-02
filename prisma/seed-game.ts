import 'dotenv/config'
import { prisma } from '../src/lib/prisma'

// ─── HELPER ───────────────────────────────────────────────────────────────────
// Sistem Pilihan: Ya / Tidak
function q(scenario_text: string, funfact: string) {
  return {
    scenario_text,
    option_a: 'Ya',
    option_b: 'Tidak',
    option_c: '-',
    option_d: '-',
    correct_option: 'Ya',
    points: 10,
    funfact
  }
}

const SAINTEK_QUESTIONS = {
  EASY: [
    q("Pernah belajar satu materi berjam-jam cuma buat paham satu konsep?", "Di dunia perkuliahan bukan hanya sekadar menghafal loh! Tetapi diperlukan pemahaman agar memudahkan kamu dalam menguasai konsep materi."),
    q("Pernah pakai AI buat bantu jelasin materi yang susah dipahami?", "Kalau kamu bingung dengan materi yang diberikan dosen, kamu bisa kok meminta bantuan AI untuk menjelaskan atau membantu kamu dalam mencari referensi lainnya yang berkaitan dengan materi kamu."),
    q("Kalau dosen kasih soal latihan, refleks langsung nyoba ngerjain sendiri?", "Jangan coba-coba untuk Sistem Kebut Semalam ya! Biar kamu bisa memahami soalnya tanpa terburu-buru!"),
    q("Pernah merasa laptop lebih sering dipakai buat tugas daripada hiburan?", "Kamu bakalan bertemu banyak mahasiswa yang membawa laptop kemana-mana! Bahkan ke kafe pun juga hihi."),
    q("Saat ujian, pernah belajar bareng sampai menit-menit terakhir?", "Ngomong-ngomong, diskusi singkat bersama teman-teman kelas kamu bakal membantu pikiran kamu untuk me-review materi-materi yang sudah kamu pelajari semalaman loh!"),
    q("Pernah nyimpen lebih banyak foto slide dosen daripada foto diri sendiri?", "Terkadang penjelasan dari dosen kurang kamu pahami, kamu boleh banget untuk mengambil foto dari slide presentasinya! Jangan khawatir!"),
    q("Kalau lihat teknologi atau alat baru, suka penasaran cara kerjanya?", "Di bidang Saintek kamu akan banyak bertemu dengan alat ataupun teknologi baru! Pasti sangat seru!"),
    q("Pernah begadang karena tugas atau deadline?", "Semangat ya! Jangan lupa istirahat yang cukup biar kesehatanmu tetap terjaga.")
  ],
  MEDIUM: [
    q("Pernah ngerasa satu angka yang salah bisa bikin semuanya berantakan?", "Anak Saintek pasti akan bertemu dengan angka hihi. Jadi kamu harus teliti ya, jangan sampai salah, kalau tidak nanti harus mengulang dari awal deh."),
    q("Pernah duduk bareng teman berjam-jam tapi masing-masing sibuk ngerjain tugas sendiri?", "Namanya juga tugas individu, kamu pasti akan mengerjakan masing-masing, tapi tidak apa-apa banget loh sesekali berdiskusi dengan teman kamu untuk membahas tugasnya."),
    q("Pernah buka AI buat ngecek apakah jawabanmu sudah benar?", "Boleh kok menggunakan AI untuk membantu verifikasi pemahaman kamu, tapi jangan untuk mencari jawabannya ya! Tidak boleh!"),
    q("Pernah nyontek tugas teman bukan buat copas, tapi buat lihat cara pengerjaannya?", "Walaupun cuma cara pengerjaannya, tetap tidak boleh ya! Berusaha sekeras mungkin dalam persiapan ujian sehingga kamu mudah melewatinya, nanti bakal merasakan lega!"),
    q("Saat nongkrong, obrolan tiba-tiba nyasar ke tugas, praktikum, atau proyek?", "Saking banyaknya tugas, praktikum, dan proyek, sampai menjadi pembahasan di tongkrongan karena akan bertemu tiga hal itu setiap harinya."),
    q("Pernah merasa satu minggu berlalu cuma karena tugas dan deadline?", "Manajemen waktu yang baik sangat penting supaya kamu juga bisa bersantai!")
  ],
  HARD: [
    q("Pernah menghabiskan waktu lebih lama mencari letak kesalahan daripada mengerjakan tugasnya?", "Kondisi ini normal banget terjadi loh! Mulai belajar untuk menyeimbangkan antara strategi dengan pengerjaannya ya!"),
    q("Kalau dosen kasih soal sulit, lebih tertarik mencari jawabannya daripada nilai akhirnya?", "Ketika kamu berusaha menemukan solusi dari soal sulit yang diberikan lalu mendapat jawaban yang benar, rasanya seperti 'Wah, puas banget!'"),
    q("Kalau tugas kelompok berantakan, refleks langsung cari bagian mana yang salah?", "Kamu dan kelompokmu harus bekerja sama untuk mencari bagian mana yang salah karena itu tindakan awal untuk memperbaiki keadaan."),
    q("Pernah berpikir \"kayaknya ada yang nggak masuk akal\" meskipun hasil akhirnya benar?", "Ini mungkin akan terjadi padamu karena kamu kurang paham dengan prosesnya, seperti 'Loh benar, kok bisa ya?'"),
    q("Saat melihat suatu fenomena, refleks bertanya \"gimana mekanismenya ya?\"", "Penasaran tidak sih? Sepertinya kalau menemukan sesuatu yang baru itu menjadi hal menarik tersendiri untuk dipelajari, dan kamu juga bisa bertanya langsung kepada ahlinya, yaitu dosen kamu sendiri!")
  ]
}

const SOSHUM_QUESTIONS = {
  EASY: [
    q("Pernah pakai AI buat cari ide atau referensi tugas?", "Kamu bisa kok meminta bantuan AI untuk mencari referensi lainnya yang berkaitan dengan materi kamu, tapi jangan minta untuk diberikan jawaban secara langsung ya!"),
    q("Saat diskusi kelas, lebih semangat kalau topiknya dekat dengan kehidupan sehari-hari?", "Ini jelas sih, pasti akan jauh lebih mudah dipahami kalau memang topiknya itu terjadi di kehidupan sehari-hari, apalagi dari pengalaman sendiri hahaha."),
    q("Pernah menghubungkan materi kuliah dengan isu yang lagi viral?", "Fenomena viral pastilah hal yang menarik bagi anak kuliah, apalagi kalau tahu bahwa fenomena tersebut berkaitan dengan materi pembelajaran di kelas."),
    q("Pernah ikut organisasi atau kepanitiaan buat nambah relasi?", "Satu hal yang sangat penting itu adalah koneksi. Tidak heran kalau anak Soshum temannya ada di mana-mana, melihat poster pendaftaran kepanitiaan saja langsung daftar."),
    q("Saat nongkrong, obrolan bisa tiba-tiba berubah jadi diskusi serius?", "Seru kan kalau dari obrolan ringan bisa jadi diskusi berbobot? Itulah khasnya mahasiswa Soshum!"),
    q("Kenal banyak teman dari berbagai jurusan?", "Hal ini sudah dipastikan ya, soalnya organisasi untuk anak Soshum biasanya sangat banyak."),
    q("Pernah baca materi sambil buka media sosial?", "Jangan kaget kalau kamu melihat tangan kanan mengetik di laptop dan tangan kiri melihat media sosial, karena biasanya anak Soshum akan mengaitkan materi mereka dengan fenomena media sosial."),
    q("Kalau ada topik menarik, obrolannya bisa lanjut bahkan setelah kelas selesai?", "Itu tandanya kamu benar-benar bersemangat dengan bidang ilmu tersebut. Pertahankan rasa ingin tahumu!")
  ],
  MEDIUM: [
    q("Saat kerja kelompok, sering kebagian presentasi atau nyusun alur pembahasan?", "Namanya juga kerja kelompok, kamu harus ikut diskusi terkait ide atau alur pembahasannya bersama-sama!"),
    q("Saat nyari satu referensi, malah berakhir baca banyak hal lain yang masih nyambung?", "Hal ini bakal kamu temui nanti. Sedang membahas topik A, loh kok menyambung ke topik B, eh malah keterusan sampai topik Z."),
    q("Pernah pakai AI bukan buat cari jawaban, tapi buat cari sudut pandang baru?", "Banyak sudut pandang yang tidak bisa kita pahami dalam satu waktu. Kamu bisa menggunakan AI untuk membantu mencari sudut pandang lainnya! Tapi jangan langsung disalin semua ya!"),
    q("Saat ujian, lebih suka belajar dengan cara diskusi daripada belajar sendiri?", "Masih terkait sudut pandang nih, teman kamu pasti punya sudut pandang yang berbeda denganmu. Berdiskusi akan membuatmu saling bertukar pemahaman sehingga kamu bisa lebih dalam memahami materi!"),
    q("Pernah nyontek tugas teman buat lihat cara menyusun argumennya?", "Tidak boleh ya, apapun alasannya! Kamu harus menemukan argumenmu sendiri. Pasti akan sangat ketahuan menyontek kalau argumennya sama persis."),
    q("Saat lihat berita viral, langsung penasaran kenapa orang-orang bereaksi seperti itu?", "Empati dan analisis sosial yang tajam adalah kunci utama bagi anak Soshum."),
    q("Pernah membahas isu sosial saat nongkrong lebih lama daripada membahas tugas?", "Kebiasaan anak Soshum nih, kalau ada isu sosial yang sedang ramai, langsung dibahas sampai lupa kalau ada tugas! Coba untuk menyeimbangkannya ya!")
  ],
  HARD: [
    q("Kalau ada suatu masalah, refleks pertama kamu adalah mencari alasan \"kenapa ini bisa terjadi\"?", "Pola pikir kritis ini akan sangat berguna ketika kamu menyusun skripsi dan mencari akar permasalahan."),
    q("Pernah lebih tertarik memahami pola pikir seseorang daripada mencari siapa yang benar?", "Di rumpun Soshum kamu akan bertemu dengan kebiasaan bertukar pendapat. Nah, dari situ kamu bisa menilai pola pikir seseorang dan juga menambah perspektif baru untukmu."),
    q("Saat membaca berita, pernah tiba-tiba mempertanyakan sudut pandang yang digunakan?", "Kamu pasti akan mengalami ini, 'Loh kok perspektifku beda ya?'. Hal ini sangat wajar ya. Kamu bisa tahu lebih luas dari berbagai perspektif yang berbeda dalam lingkup Soshum."),
    q("Kalau dosen memberi satu kasus, otomatis kepikiran banyak perspektif yang berbeda?", "Ini bakal membuat kamu dilema sih, perspektif mana yang akan kamu pakai untuk menjawab kasus dari dosen tersebut. Tapi tidak apa-apa, pelan-pelan saja ya. Pahami dengan baik, nanti pasti ketemu perspektif yang menurut kamu pas."),
    q("Pernah merasa diskusi yang seru lebih memuaskan daripada menemukan jawaban pasti?", "Soshum pasti tidak asing dengan yang namanya debat. Biasanya sih dalam diskusi kamu bakal berdebat seru terkait suatu hal. Ingat, hanya untuk seru-seruan berdiskusi saja ya!"),
    q("Saat melihat suatu fenomena, refleks bertanya \"apa dampaknya bagi masyarakat?\"", "Namanya juga anak Soshum, pasti akrab dengan kata 'masyarakat', karena pengaruh suatu peristiwa sering menjadi perhatian utama dalam kehidupan bermasyarakat.")
  ]
}

const SAINTEK_CATEGORIES = [
  'Kesehatan', 'Teknik & Rekayasa', 'Komputasi & Data', 'Arsitektur', 'Pendidikan Saintek'
]

const SOSHUM_CATEGORIES = [
  'Sosial & Humaniora', 'Pendidikan', 'Bisnis & Ekonomi', 'Bahasa, Seni & Kreatif', 'Komunikasi Kreatif'
]

async function main() {
  console.log('🌱 Seeding game missions (Ya/Tidak)...')

  await prisma.gameProgress.deleteMany()
  await prisma.gameQuestion.deleteMany()
  await prisma.gameMission.deleteMany()
  await prisma.majorProfile.deleteMany()
  await prisma.major.deleteMany()

  // ─── Seed Saintek ──────────────────────────────────────────────────────────────────
  console.log('📘 Seeding SAINTEK...')
  for (const categoryName of SAINTEK_CATEGORIES) {
    const major = await prisma.major.create({
      data: {
        name: categoryName,
        description: `Kelompok jurusan ${categoryName} dalam kelompok Saintek, mencakup berbagai program studi yang berfokus pada ilmu pengetahuan alam dan teknologi.`,
        arena: 'Saintek',
        category: categoryName,
        profiles: {
          create: {
            ideal_riasec: { I: 25, R: 20, C: 15, S: 5, E: 10, A: 10 },
            ideal_dat: { Numerical: 80, Verbal: 60, Clerical: 60 }
          }
        }
      }
    })

    await prisma.gameMission.create({
      data: {
        major_id: major.id,
        title: 'Misi 1: Level Dasar',
        level: 1, min_point: 10,
        questions: { create: SAINTEK_QUESTIONS.EASY }
      }
    })
    
    await prisma.gameMission.create({
      data: {
        major_id: major.id,
        title: 'Misi 2: Level Menengah',
        level: 2, min_point: 20,
        questions: { create: SAINTEK_QUESTIONS.MEDIUM }
      }
    })
    
    await prisma.gameMission.create({
      data: {
        major_id: major.id,
        title: 'Misi 3: Level Mahir',
        level: 3, min_point: 50,
        questions: { create: SAINTEK_QUESTIONS.HARD }
      }
    })
    console.log(`  ✅ ${categoryName} — 3 misi`)
  }

  // ─── Seed Soshum ───────────────────────────────────────────────────────────────────
  console.log('📕 Seeding SOSHUM...')
  for (const categoryName of SOSHUM_CATEGORIES) {
    const major = await prisma.major.create({
      data: {
        name: categoryName,
        description: `Kelompok jurusan ${categoryName} dalam kelompok Soshum, mencakup berbagai program studi yang berfokus pada ilmu sosial, humaniora, dan komunikasi.`,
        arena: 'Soshum',
        category: categoryName,
        profiles: {
          create: {
            ideal_riasec: { S: 30, I: 20, A: 15, E: 15, C: 10, R: 5 },
            ideal_dat: { Numerical: 50, Verbal: 85, Clerical: 60 }
          }
        }
      }
    })

    await prisma.gameMission.create({
      data: {
        major_id: major.id,
        title: 'Misi 1: Level Dasar',
        level: 1, min_point: 10,
        questions: { create: SOSHUM_QUESTIONS.EASY }
      }
    })
    
    await prisma.gameMission.create({
      data: {
        major_id: major.id,
        title: 'Misi 2: Level Menengah',
        level: 2, min_point: 20,
        questions: { create: SOSHUM_QUESTIONS.MEDIUM }
      }
    })
    
    await prisma.gameMission.create({
      data: {
        major_id: major.id,
        title: 'Misi 3: Level Mahir',
        level: 3, min_point: 50,
        questions: { create: SOSHUM_QUESTIONS.HARD }
      }
    })
    console.log(`  ✅ ${categoryName} — 3 misi`)
  }

  console.log(`\n🎉 Seeding selesai!`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
