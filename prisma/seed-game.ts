import { prisma } from '../src/lib/prisma'

// ─── HELPER ───────────────────────────────────────────────────────────────────
// Semua soal pakai opsi yang sama (SS/P/J/BP)
// Poin: SS=20, P=15, J=10, BP=5
function q(scenario_text: string) {
  return {
    scenario_text,
    option_a: 'Sangat Sering',
    option_b: 'Pernah',
    option_c: 'Jarang',
    option_d: 'Belum Pernah',
    correct_option: 'Sangat Sering', // hanya referensi, scoring berbasis pilihan
    points: 20                        // max poin per soal
  }
}

// ─── MIN_POINT PER LEVEL ──────────────────────────────────────────────────────
// 2 soal × maks 20 = 40 poin per misi
// Level 1: min 10  → complete jika skor ≥ 10 (minim 1 jawaban BP + J)
// Level 2: min 20  → terbuka saat totalPoints ≥ 20
// Level 3: min 50  → terbuka saat totalPoints ≥ 50 (perlu skor bagus di L1+L2)

// ─── SAINTEK ─────────────────────────────────────────────────────────────────

const SAINTEK_MISSIONS = {
  // ── Kesehatan ──────────────────────────────────────────────────────────────
  'Kesehatan': [
    {
      title: 'Misi 1: Pengalaman Belajar di Dunia Kesehatan',
      level: 1, min_point: 10,
      questions: [
        q('Pernah belajar satu materi berjam-jam cuma buat paham satu konsep anatomi atau fisiologi?'),
        q('Pernah pakai AI buat bantu jelasin materi farmakologi atau biokimia yang susah dipahami?'),
      ]
    },
    {
      title: 'Misi 2: Kehidupan Praktikum & Lab',
      level: 2, min_point: 20,
      questions: [
        q('Pernah ngerasa satu angka yang salah di perhitungan dosis atau hasil lab bisa bikin semuanya berantakan?'),
        q('Saat nongkrong, obrolan tiba-tiba nyasar ke tugas anatomi, jadwal praktikum, atau deadline laporan klinik?'),
      ]
    },
    {
      title: 'Misi 3: Pola Pikir Kritis Tenaga Medis',
      level: 3, min_point: 50,
      questions: [
        q('Pernah menghabiskan waktu lebih lama mencari letak kesalahan diagnosa atau prosedur daripada mengerjakan laporannya?'),
        q('Saat melihat suatu gejala atau kasus, refleks bertanya "gimana mekanisme patofisiologinya ya?"'),
      ]
    },
  ],

  // ── Teknik & Rekayasa ─────────────────────────────────────────────────────
  'Teknik & Rekayasa': [
    {
      title: 'Misi 1: Hari-Hari Mahasiswa Teknik',
      level: 1, min_point: 10,
      questions: [
        q('Kalau lihat teknologi atau alat baru, suka penasaran cara kerjanya dan langsung ingin tahu lebih dalam?'),
        q('Pernah begadang karena tugas gambar teknik, simulasi, atau deadline laporan praktikum?'),
      ]
    },
    {
      title: 'Misi 2: Proyek, Tugas & Deadline Teknik',
      level: 2, min_point: 20,
      questions: [
        q('Pernah merasa satu minggu berlalu cuma karena tugas, praktikum, dan proyek rekayasa yang bertumpuk?'),
        q('Saat nongkrong, obrolan kamu dan teman teknik selalu nyasar ke proyek, kode, atau perhitungan struktur?'),
      ]
    },
    {
      title: 'Misi 3: Problem Solving Ala Insinyur',
      level: 3, min_point: 50,
      questions: [
        q('Kalau tugas kelompok desain atau proyek berantakan, refleks langsung cari bagian mana yang salah dan apa penyebabnya?'),
        q('Pernah berpikir "kayaknya ada yang nggak masuk akal" meskipun hasil akhir hitunganmu benar?'),
      ]
    },
  ],

  // ── Komputasi & Data ──────────────────────────────────────────────────────
  'Komputasi & Data': [
    {
      title: 'Misi 1: Hari-Hari Mahasiswa Komputasi',
      level: 1, min_point: 10,
      questions: [
        q('Pernah merasa laptop lebih sering dipakai buat coding, data wrangling, atau analisis daripada hiburan?'),
        q('Kalau dosen kasih soal algoritma atau pemrograman, refleks langsung nyoba ngerjain sendiri dulu?'),
      ]
    },
    {
      title: 'Misi 2: Debug, Deadline & Data',
      level: 2, min_point: 20,
      questions: [
        q('Pernah duduk bareng teman di lab komputer berjam-jam, masing-masing sibuk ngerjain tugas sendiri tapi sesekali diskusi soal error?'),
        q('Pernah buka AI buat ngecek apakah logika kode atau analisis statistikamu sudah benar?'),
      ]
    },
    {
      title: 'Misi 3: Logika Tinggi & Analisis Mendalam',
      level: 3, min_point: 50,
      questions: [
        q('Pernah menghabiskan waktu lebih lama mencari bug atau letak kesalahan kode daripada nulis kode barunya?'),
        q('Saat melihat dataset atau fenomena teknologi, refleks bertanya "gimana polanya, ada anomali tidak?"'),
      ]
    },
  ],

  // ── Arsitektur ─────────────────────────────────────────────────────────────
  'Arsitektur': [
    {
      title: 'Misi 1: Dunia Studio Arsitektur',
      level: 1, min_point: 10,
      questions: [
        q('Pernah nyimpen lebih banyak foto referensi desain bangunan dan slide dosen daripada foto diri sendiri di galeri ponselmu?'),
        q('Kalau lihat gedung atau ruang baru, langsung penasaran struktur, material, dan konsep desainnya?'),
      ]
    },
    {
      title: 'Misi 2: Maket, Deadline & Studio',
      level: 2, min_point: 20,
      questions: [
        q('Pernah ngerasa satu garis atau detail yang salah di gambar kerja bisa bikin desain keseluruhan berantakan?'),
        q('Pernah merasa satu minggu berlalu cuma karena deadline maket, presentasi studio, dan revisi desain?'),
      ]
    },
    {
      title: 'Misi 3: Kritis & Kreatif Ala Arsitek',
      level: 3, min_point: 50,
      questions: [
        q('Kalau dosen kasih studio project sulit, lebih tertarik mencari solusi desain yang tepat daripada sekadar mengejar nilai akhir?'),
        q('Saat melihat suatu ruang atau bangunan, refleks bertanya "gimana sirkulasi, pencahayaan, dan fungsinya ya?"'),
      ]
    },
  ],

  // ── Pendidikan Saintek ────────────────────────────────────────────────────
  'Pendidikan Saintek': [
    {
      title: 'Misi 1: Menjadi Calon Pendidik Sains',
      level: 1, min_point: 10,
      questions: [
        q('Kalau dosen kasih soal IPA atau matematika, refleks langsung nyoba ngerjain sendiri sebelum lihat buku atau diskusi?'),
        q('Pernah merasa laptop dan ponselmu lebih banyak berisi modul ajar, video eksperimen, dan referensi sains daripada konten lain?'),
      ]
    },
    {
      title: 'Misi 2: Kurikulum, Praktikum & Pengajaran',
      level: 2, min_point: 20,
      questions: [
        q('Saat nongkrong, obrolan malah ke RPP, metode mengajar sains, atau cara bikin praktikum yang menarik untuk siswa?'),
        q('Pernah pakai AI untuk mencari referensi metode pembelajaran sains atau strategi mengajar yang inovatif?'),
      ]
    },
    {
      title: 'Misi 3: Filosofi Pendidik Sains',
      level: 3, min_point: 50,
      questions: [
        q('Saat ada fenomena alam atau sains yang viral, refleks memikirkan bagaimana cara mengajarkannya ke siswa dengan cara yang menarik?'),
        q('Saat melihat eksperimen gagal di laboratorium, lebih tertarik mencari tahu kenapa gagal daripada langsung mengulang percobaan?'),
      ]
    },
  ],
}

// ─── SOSHUM ───────────────────────────────────────────────────────────────────

const SOSHUM_MISSIONS = {
  // ── Sosial & Humaniora ────────────────────────────────────────────────────
  'Sosial & Humaniora': [
    {
      title: 'Misi 1: Kehidupan Sosial di Kampus',
      level: 1, min_point: 10,
      questions: [
        q('Saat diskusi kelas, lebih semangat kalau topiknya dekat dengan isu sosial yang terjadi di kehidupan nyata?'),
        q('Kenal banyak teman dari berbagai jurusan karena aktif ikut organisasi atau kepanitiaan?'),
      ]
    },
    {
      title: 'Misi 2: Riset, Referensi & Perspektif',
      level: 2, min_point: 20,
      questions: [
        q('Saat nyari satu referensi jurnal sosial, malah berakhir baca banyak hal lain yang masih nyambung dan relevan?'),
        q('Saat lihat berita viral, langsung penasaran kenapa orang-orang bereaksi seperti itu secara psikologis atau sosiologis?'),
      ]
    },
    {
      title: 'Misi 3: Analisis Kritis Sosial',
      level: 3, min_point: 50,
      questions: [
        q('Kalau ada suatu masalah sosial, refleks pertama adalah mencari "kenapa ini bisa terjadi secara struktural" sebelum mencari siapa yang salah?'),
        q('Saat membaca berita, tiba-tiba mempertanyakan sudut pandang atau framing yang digunakan oleh media tersebut?'),
      ]
    },
  ],

  // ── Pendidikan ────────────────────────────────────────────────────────────
  'Pendidikan': [
    {
      title: 'Misi 1: Menjadi Calon Pendidik',
      level: 1, min_point: 10,
      questions: [
        q('Saat diskusi kelas pendidikan, lebih semangat kalau topiknya nyambung ke pengalaman belajar nyata yang pernah kamu alami sendiri?'),
        q('Pernah baca materi pedagogi sambil sekaligus lihat referensi tren belajar atau fenomena pendidikan di media sosial?'),
      ]
    },
    {
      title: 'Misi 2: Dinamika Kelas & Pengajaran',
      level: 2, min_point: 20,
      questions: [
        q('Saat ujian atau latihan micro teaching, lebih suka berlatih mengajar dengan cara berdiskusi bareng teman daripada belajar sendirian?'),
        q('Kalau ada topik pendidikan menarik, obrolannya bisa lanjut bahkan setelah kelas selesai dan kalian sudah di luar kampus?'),
      ]
    },
    {
      title: 'Misi 3: Filosofi & Etika Pendidik',
      level: 3, min_point: 50,
      questions: [
        q('Lebih tertarik memahami pola pikir dan hambatan belajar siswa yang kesulitan daripada langsung memberi nilai rendah?'),
        q('Pernah merasa diskusi tentang filosofi atau etika pendidikan yang seru lebih memuaskan daripada mencari jawaban "cara mengajar yang benar"?'),
      ]
    },
  ],

  // ── Bisnis & Ekonomi ──────────────────────────────────────────────────────
  'Bisnis & Ekonomi': [
    {
      title: 'Misi 1: Dunia Mahasiswa Bisnis',
      level: 1, min_point: 10,
      questions: [
        q('Pernah ikut organisasi atau kepanitiaan kampus dengan semangat membangun relasi dan portofolio bisnis?'),
        q('Pernah menghubungkan materi manajemen atau akuntansi dengan berita ekonomi atau fenomena bisnis yang lagi viral?'),
      ]
    },
    {
      title: 'Misi 2: Kolaborasi, Deadline & Analisis',
      level: 2, min_point: 20,
      questions: [
        q('Saat kerja kelompok analisis keuangan atau business plan, sering kebagian presentasi dan menyusun alur pembahasan?'),
        q('Pernah membahas isu ekonomi atau strategi bisnis suatu brand saat nongkrong lebih lama daripada membahas tugas kuliah?'),
      ]
    },
    {
      title: 'Misi 3: Analisis Bisnis Tingkat Lanjut',
      level: 3, min_point: 50,
      questions: [
        q('Kalau ada krisis ekonomi atau fenomena pasar, refleks pertama mencari "kenapa ini bisa terjadi secara struktural" daripada langsung berkomentar?'),
        q('Saat dosen memberi satu studi kasus bisnis, otomatis kepikiran banyak perspektif analisis berbeda sekaligus?'),
      ]
    },
  ],

  // ── Bahasa, Seni & Kreatif ────────────────────────────────────────────────
  'Bahasa, Seni & Kreatif': [
    {
      title: 'Misi 1: Kreativitas di Kampus Seni',
      level: 1, min_point: 10,
      questions: [
        q('Pernah pakai AI buat cari ide visual, referensi desain, atau inspirasi artistik untuk tugas DKV, multimedia, atau seni?'),
        q('Kalau ada topik desain, sastra, atau seni menarik, obrolan bisa berlanjut bahkan setelah kelas sudah selesai?'),
      ]
    },
    {
      title: 'Misi 2: Proses Kreatif & Kolaborasi',
      level: 2, min_point: 20,
      questions: [
        q('Pernah pakai AI bukan buat cari jawaban, tapi buat cari sudut pandang estetika atau gaya visual baru yang belum pernah kamu coba?'),
        q('Saat lihat karya visual, iklan, atau konten kreatif yang viral, langsung penasaran kenapa orang bereaksi kuat terhadapnya?'),
      ]
    },
    {
      title: 'Misi 3: Kritik & Filosofi Seni',
      level: 3, min_point: 50,
      questions: [
        q('Lebih tertarik memahami mengapa sebuah karya seni atau desain berhasil secara komunikasi daripada sekadar mengaguminya?'),
        q('Saat melihat suatu fenomena budaya, refleks bertanya "apa makna representasi dan dampaknya bagi masyarakat?"'),
      ]
    },
  ],

  // ── Komunikasi Kreatif ────────────────────────────────────────────────────
  'Komunikasi Kreatif': [
    {
      title: 'Misi 1: Dunia PR & Advertising',
      level: 1, min_point: 10,
      questions: [
        q('Pernah ikut kepanitiaan acara kampus dengan semangat melatih kemampuan event management dan public relations?'),
        q('Saat nongkrong, obrolan tiba-tiba jadi diskusi serius soal strategi kampanye iklan atau branding suatu brand?'),
      ]
    },
    {
      title: 'Misi 2: Strategi & Eksekusi Komunikasi',
      level: 2, min_point: 20,
      questions: [
        q('Saat kerja kelompok kampanye komunikasi, sering yang menyusun alur pesan, strategi media, dan target audiensnya?'),
        q('Pernah menganalisis strategi media sosial brand ternama saat nongkrong dan jadi lebih seru daripada bahas tugas?'),
      ]
    },
    {
      title: 'Misi 3: Analisis & Dampak Komunikasi',
      level: 3, min_point: 50,
      questions: [
        q('Saat membaca berita viral, tiba-tiba mempertanyakan framing dan agenda setting yang digunakan media tersebut?'),
        q('Lebih tertarik memahami mengapa suatu kampanye komunikasi berhasil menggerakkan opini publik daripada sekadar meniru formatnya?'),
      ]
    },
  ],
}

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding game missions (sistem poin SS/P/J/BP)...')

  // Hapus semua data game lama
  await prisma.gameProgress.deleteMany()
  await prisma.gameQuestion.deleteMany()
  await prisma.gameMission.deleteMany()
  await prisma.majorProfile.deleteMany()
  await prisma.major.deleteMany()

  // ── Seed Saintek ────────────────────────────────────────────────────────
  console.log('📗 Seeding SAINTEK...')
  for (const [categoryName, missions] of Object.entries(SAINTEK_MISSIONS)) {
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

    for (const mission of missions) {
      await prisma.gameMission.create({
        data: {
          major_id: major.id,
          title: mission.title,
          level: mission.level,
          min_point: mission.min_point,
          questions: { create: mission.questions }
        }
      })
    }
    console.log(`  ✅ ${categoryName} — ${missions.length} misi`)
  }

  // ── Seed Soshum ─────────────────────────────────────────────────────────
  console.log('📘 Seeding SOSHUM...')
  for (const [categoryName, missions] of Object.entries(SOSHUM_MISSIONS)) {
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

    for (const mission of missions) {
      await prisma.gameMission.create({
        data: {
          major_id: major.id,
          title: mission.title,
          level: mission.level,
          min_point: mission.min_point,
          questions: { create: mission.questions }
        }
      })
    }
    console.log(`  ✅ ${categoryName} — ${missions.length} misi`)
  }

  const totalCat = Object.keys(SAINTEK_MISSIONS).length + Object.keys(SOSHUM_MISSIONS).length
  console.log(`\n🎉 Seeding selesai!`)
  console.log(`   📂 Total kategori : ${totalCat} (5 Saintek + 5 Soshum)`)
  console.log(`   📋 Total misi     : ${totalCat * 3} (3 per kategori)`)
  console.log(`   ❓ Total soal     : ${totalCat * 3 * 2} (2 per misi)`)
  console.log(`   🎯 Sistem poin    : SS=20 | P=15 | J=10 | BP=5`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
