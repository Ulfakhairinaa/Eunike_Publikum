# PHASE 3.1: QUIZ DATA SEEDING - IMPLEMENTATION
**Timeline**: 1-1.5 hours | **After**: Phase 2 complete

---

## 📋 What to Seed

```
Total: 51 Questions
├─ 36 RIASEC Items (6 per domain)
│  ├─ Realistic (R1-R6)
│  ├─ Investigative (I1-I6)
│  ├─ Artistic (A1-A6)
│  ├─ Social (S1-S6)
│  ├─ Enterprising (E1-E6)
│  └─ Conventional (C1-C6)
└─ 15 DAT Items
   ├─ 5 Verbal (Penalaran Logika)
   ├─ 5 Numerik (Kemampuan Hitung)
   └─ 5 Klarikal (Presisi Tinggi)
```

---

## ✅ Step-by-Step Implementation

### Step 1: Update `prisma/schema.prisma`

Check that Quiz model looks like this:

```prisma
model Quiz {
  id               String   @id @default(cuid())
  tipe_soal        String   // RIASEC, Verbal, Numerik, Klarikal
  domain           String?  // R, I, A, S, E, C (for RIASEC only)
  kesulitan        String   // Easy, Medium, Hard
  nomor_urut       Int?     // Question order (1-36 for RIASEC, 1-15 for DAT)
  teks_soal        String
  pilihan_jawaban  Json     // For RIASEC: [{value: 0-4, label: "STS"}]; For DAT: [{value: "A", label: "..."}, ...]
  kunci_jawaban    String   // For RIASEC: "0-4"; For DAT: "A"
  penjelasan       String?  // Optional explanation
  
  created_at       DateTime @default(now())
  
  @@index([tipe_soal])
  @@index([domain])
}
```

If schema changed, run:
```bash
npx prisma migrate dev --name update_quiz_model
```

---

### Step 2: Create `prisma/seed-data.ts`

This file contains all quiz data (separate from seed.ts for clarity):

```typescript
// prisma/seed-data.ts

export const RIASEC_QUESTIONS = [
  // REALISTIC (R) - 6 items
  {
    nomor_urut: 1,
    domain: "R",
    tipe_soal: "RIASEC",
    teks_soal:
      "Menggunakan peralatan tangan atau perkakas mekanik untuk memperbaiki benda yang rusak.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4", // User pilih 0-4
  },
  {
    nomor_urut: 2,
    domain: "R",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mempelajari cara kerja komponen mesin, perangkat elektronik, atau sistem mekanis.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 3,
    domain: "R",
    tipe_soal: "RIASEC",
    teks_soal:
      "Membangun, merakit, atau membuat struktur benda menggunakan material fisik (kayu, logam, zat padat).",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 4,
    domain: "R",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengoperasikan kendaraan, alat berat, atau peralatan teknis yang membutuhkan ketepatan fisik.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 5,
    domain: "R",
    tipe_soal: "RIASEC",
    teks_soal:
      "Melakukan pekerjaan fisik di luar ruangan yang berhubungan langsung dengan alam atau hewan.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 6,
    domain: "R",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengikuti instruksi teknis berupa cetak biru (blueprint) atau diagram mekanis untuk membuat sesuatu.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },

  // INVESTIGATIVE (I) - 6 items
  {
    nomor_urut: 7,
    domain: "I",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengamati, meneliti, dan mencari tahu latar belakang penyebab terjadinya suatu fenomena.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 8,
    domain: "I",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengumpulkan data dan menganalisis informasi yang rumit untuk menemukan pola tertentu.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 9,
    domain: "I",
    tipe_soal: "RIASEC",
    teks_soal:
      "Melakukan eksperimen ilmiah atau pengujian di laboratorium untuk membuktikan suatu teori.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 10,
    domain: "I",
    tipe_soal: "RIASEC",
    teks_soal:
      "Memecahkan masalah teoretis atau teka-teki logika yang membutuhkan pemikiran mendalam.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 11,
    domain: "I",
    tipe_soal: "RIASEC",
    teks_soal:
      "Membaca artikel ilmiah, jurnal, atau buku panduan teknis yang padat informasi untuk mempelajari hal baru.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 12,
    domain: "I",
    tipe_soal: "RIASEC",
    teks_soal:
      "Memeriksa kejanggalan, mengaudit data, atau menginvestigasi kesalahan tersembunyi dalam suatu sistem.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },

  // ARTISTIC (A) - 6 items
  {
    nomor_urut: 13,
    domain: "A",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengekspresikan ide, perasaan, atau pemikiran melalui karya seni visual, musik, atau sastra.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 14,
    domain: "A",
    tipe_soal: "RIASEC",
    teks_soal:
      "Merancang konsep estetika, tata letak visual, atau desain yang mengutamakan keindahan.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 15,
    domain: "A",
    tipe_soal: "RIASEC",
    teks_soal:
      "Menulis karya kreatif seperti cerita, esai, skrip, atau gaya bahasa persuasif yang tidak kaku.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 16,
    domain: "A",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengembangkan ide-ide unik atau improvisasi spontan tanpa harus terikat pada aturan yang baku.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 17,
    domain: "A",
    tipe_soal: "RIASEC",
    teks_soal:
      "Menampilkan pertunjukan, memainkan karya musik, atau terlibat dalam kegiatan industri kreatif.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 18,
    domain: "A",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengubah tampilan atau memodifikasi suatu objek agar terlihat lebih menarik dan memiliki nilai seni.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },

  // SOCIAL (S) - 6 items
  {
    nomor_urut: 19,
    domain: "S",
    tipe_soal: "RIASEC",
    teks_soal:
      "Menjelaskan konsep yang sulit atau mengajarkan keterampilan baru kepada orang lain agar mereka paham.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 20,
    domain: "S",
    tipe_soal: "RIASEC",
    teks_soal:
      "Memberikan bimbingan, konseling, atau saran emosional kepada orang yang sedang menghadapi masalah.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 21,
    domain: "S",
    tipe_soal: "RIASEC",
    teks_soal:
      "Membantu kelompok atau komunitas meningkatkan kesejahteraan dan kualitas hidup mereka.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 22,
    domain: "S",
    tipe_soal: "RIASEC",
    teks_soal:
      "Merawat, mengobati, atau menjaga pemulihan fisik dan mental orang yang membutuhkan pertolongan.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 23,
    domain: "S",
    tipe_soal: "RIASEC",
    teks_soal:
      "Menjadi penengah dalam diskusi kelompok untuk mendamaikan perbedaan pendapat atau konflik.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 24,
    domain: "S",
    tipe_soal: "RIASEC",
    teks_soal:
      "Melakukan aktivitas pelayanan publik atau kerja sukarela demi kepentingan orang banyak.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },

  // ENTERPRISING (E) - 6 items
  {
    nomor_urut: 25,
    domain: "E",
    tipe_soal: "RIASEC",
    teks_soal:
      "Membujuk, meyakinkan, atau memengaruhi orang lain agar menerima sudut pandang atau produk yang ditawarkan.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 26,
    domain: "E",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengambil tanggung jawab memimpin tim dan mendelegasikan tugas demi mencapai target kelompok.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 27,
    domain: "E",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengambil risiko dalam merencanakan strategi bisnis, penjualan, atau proyek baru yang kompetitif.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 28,
    domain: "E",
    tipe_soal: "RIASEC",
    teks_soal:
      "Melakukan negosiasi kesepakatan, harga, atau kerja sama formal dengan pihak luar.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 29,
    domain: "E",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengorganisasi kampanye, pidato publik, atau presentasi untuk menggerakkan massa.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 30,
    domain: "E",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengelola jalannya operasional suatu organisasi atau bisnis agar berjalan menguntungkan.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },

  // CONVENTIONAL (C) - 6 items
  {
    nomor_urut: 31,
    domain: "C",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengatur, mengelompokkan, dan mengarsip dokumen atau data digital secara sistematis.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 32,
    domain: "C",
    tipe_soal: "RIASEC",
    teks_soal:
      "Memeriksa keakuratan angka, laporan keuangan, transaksi kas, atau catatan detail lainnya.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 33,
    domain: "C",
    tipe_soal: "RIASEC",
    teks_soal:
      "Menjalankan tugas rutin yang membutuhkan ketelitian tinggi dan kepatuhan penuh pada Standar Operasional (SOP).",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 34,
    domain: "C",
    tipe_soal: "RIASEC",
    teks_soal:
      "Membuat tabel, jadwal kerja, daftar inventaris, atau checklist kegiatan yang terstruktur rapi.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 35,
    domain: "C",
    tipe_soal: "RIASEC",
    teks_soal:
      "Meninjau kembali isi dokumen formal atau kontrak untuk memastikan tidak ada aturan hukum yang dilanggar.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
  {
    nomor_urut: 36,
    domain: "C",
    tipe_soal: "RIASEC",
    teks_soal:
      "Mengoperasikan sistem perangkat lunak administrasi untuk menginput dan memproses data perkantoran.",
    pilihan_jawaban: [
      { value: 0, label: "Sangat Tidak Suka" },
      { value: 1, label: "Tidak Suka" },
      { value: 2, label: "Biasa Saja" },
      { value: 3, label: "Suka" },
      { value: 4, label: "Sangat Suka" },
    ],
    kunci_jawaban: "0-4",
  },
];

export const DAT_QUESTIONS = [
  // VERBAL (5 questions) - Penalaran Logika
  {
    nomor_urut: 1,
    tipe_soal: "Verbal",
    kesulitan: "Medium",
    teks_soal:
      "Sapi adalah Mamalia. Ayam adalah ___. Hubungan di atas sama dengan hubungan antara ___.",
    pilihan_jawaban: [
      { value: "A", label: "Sapi : Mamalia" },
      { value: "B", label: "Ayam : Unggas" },
      { value: "C", label: "Kucing : Feline" },
      { value: "D", label: "Ikan : Vertebrata" },
    ],
    kunci_jawaban: "B",
    penjelasan: "Ayam termasuk kelas Unggas, seperti Sapi termasuk kelas Mamalia",
  },
  {
    nomor_urut: 2,
    tipe_soal: "Verbal",
    kesulitan: "Medium",
    teks_soal:
      "Matahari : Fusi Nuklir. Garam : ___. Hubungan di atas menunjukkan proses yang sama.",
    pilihan_jawaban: [
      { value: "A", label: "Kristalisasi" },
      { value: "B", label: "Evaporasi" },
      { value: "C", label: "Ionisasi" },
      { value: "D", label: "Sublimasi" },
    ],
    kunci_jawaban: "A",
    penjelasan: "Garam terbentuk melalui kristalisasi, seperti energi matahari dari fusi nuklir",
  },
  {
    nomor_urut: 3,
    tipe_soal: "Verbal",
    kesulitan: "Hard",
    teks_soal:
      "Jika semua X adalah Y, dan beberapa Y adalah Z, apakah semua X pasti Z?",
    pilihan_jawaban: [
      { value: "A", label: "Ya, pasti" },
      { value: "B", label: "Tidak, belum tentu" },
      { value: "C", label: "Tergantung jumlahnya" },
      { value: "D", label: "Perlu informasi tambahan" },
    ],
    kunci_jawaban: "B",
    penjelasan:
      "Hanya beberapa Y yang Z, jadi tidak semua X (yang merupakan Y) pasti Z",
  },
  {
    nomor_urut: 4,
    tipe_soal: "Verbal",
    kesulitan: "Medium",
    teks_soal:
      "Buku : Penulis. Lukisan : ___. Kelanjutan analogi yang benar adalah:",
    pilihan_jawaban: [
      { value: "A", label: "Kanvas" },
      { value: "B", label: "Kuas" },
      { value: "C", label: "Pelukis" },
      { value: "D", label: "Warna" },
    ],
    kunci_jawaban: "C",
    penjelasan: "Buku dibuat oleh Penulis, seperti Lukisan dibuat oleh Pelukis",
  },
  {
    nomor_urut: 5,
    tipe_soal: "Verbal",
    kesulitan: "Hard",
    teks_soal:
      "Urutan logis: Embrio > Bayi > Anak > ___. Apa tahap berikutnya?",
    pilihan_jawaban: [
      { value: "A", label: "Dewasa Muda" },
      { value: "B", label: "Remaja" },
      { value: "C", label: "Orangtua" },
      { value: "D", label: "Lansia" },
    ],
    kunci_jawaban: "B",
    penjelasan: "Urutan perkembangan manusia: Embrio > Bayi > Anak > Remaja > Dewasa",
  },

  // NUMERIK (5 questions) - Kemampuan Hitung
  {
    nomor_urut: 6,
    tipe_soal: "Numerik",
    kesulitan: "Easy",
    teks_soal:
      "Jika X berbanding terbalik dengan Y (X : Y = 1 : 2), dan X = 10, berapa Y?",
    pilihan_jawaban: [
      { value: "A", label: "5" },
      { value: "B", label: "10" },
      { value: "C", label: "20" },
      { value: "D", label: "40" },
    ],
    kunci_jawaban: "C",
    penjelasan: "Perbandingan terbalik: 10 : Y = 1 : 2, maka Y = 20",
  },
  {
    nomor_urut: 7,
    tipe_soal: "Numerik",
    kesulitan: "Medium",
    teks_soal:
      "Harga barang Rp 100.000. Diskon 20%. Berapa harga akhir? (Bonus: Keuntungan 15% dari harga beli Rp 80.000 adalah?)",
    pilihan_jawaban: [
      { value: "A", label: "Rp 80.000" },
      { value: "B", label: "Rp 92.000" },
      { value: "C", label: "Rp 75.000" },
      { value: "D", label: "Rp 70.000" },
    ],
    kunci_jawaban: "A",
    penjelasan: "100.000 - (100.000 × 20%) = 100.000 - 20.000 = 80.000",
  },
  {
    nomor_urut: 8,
    tipe_soal: "Numerik",
    kesulitan: "Medium",
    teks_soal:
      "Rata-rata 3 bilangan adalah 60. Jika 2 bilangan adalah 50 dan 70, berapa bilangan ke-3?",
    pilihan_jawaban: [
      { value: "A", label: "50" },
      { value: "B", label: "60" },
      { value: "C", label: "65" },
      { value: "D", label: "70" },
    ],
    kunci_jawaban: "B",
    penjelasan: "(50 + 70 + X) / 3 = 60, maka X = 60",
  },
  {
    nomor_urut: 9,
    tipe_soal: "Numerik",
    kesulitan: "Hard",
    teks_soal:
      "Persamaan: 2X + 5 = 3X - 10. Berapa nilai X?",
    pilihan_jawaban: [
      { value: "A", label: "10" },
      { value: "B", label: "15" },
      { value: "C", label: "20" },
      { value: "D", label: "25" },
    ],
    kunci_jawaban: "B",
    penjelasan: "2X + 5 = 3X - 10 → 5 + 10 = 3X - 2X → X = 15",
  },
  {
    nomor_urut: 10,
    tipe_soal: "Numerik",
    kesulitan: "Hard",
    teks_soal:
      "Jika A = 1/4 dari B, dan B = 60, berapa A + B?",
    pilihan_jawaban: [
      { value: "A", label: "75" },
      { value: "B", label: "80" },
      { value: "C", label: "85" },
      { value: "D", label: "90" },
    ],
    kunci_jawaban: "A",
    penjelasan: "A = 60/4 = 15, maka A + B = 15 + 60 = 75",
  },

  // KLARIKAL (5 questions) - Presisi Tinggi
  {
    nomor_urut: 11,
    tipe_soal: "Klarikal",
    kesulitan: "Medium",
    teks_soal: "Cocokkan dua kolom teks berikut: A7K3M9N | A7K3M9N",
    pilihan_jawaban: [
      { value: "A", label: "SAMA" },
      { value: "B", label: "BERBEDA" },
    ],
    kunci_jawaban: "A",
  },
  {
    nomor_urut: 12,
    tipe_soal: "Klarikal",
    kesulitan: "Medium",
    teks_soal: "Cocokkan dua kolom teks berikut: 4D2K7L | 4D2K7E",
    pilihan_jawaban: [
      { value: "A", label: "SAMA" },
      { value: "B", label: "BERBEDA" },
    ],
    kunci_jawaban: "B",
  },
  {
    nomor_urut: 13,
    tipe_soal: "Klarikal",
    kesulitan: "Hard",
    teks_soal: "Cocokkan dua kolom teks berikut: RB9M4X2 | RB9M4X2",
    pilihan_jawaban: [
      { value: "A", label: "SAMA" },
      { value: "B", label: "BERBEDA" },
    ],
    kunci_jawaban: "A",
  },
  {
    nomor_urut: 14,
    tipe_soal: "Klarikal",
    kesulitan: "Hard",
    teks_soal: "Cocokkan dua kolom teks berikut: Z5P8T1Q | Z5P8T1O",
    pilihan_jawaban: [
      { value: "A", label: "SAMA" },
      { value: "B", label: "BERBEDA" },
    ],
    kunci_jawaban: "B",
  },
  {
    nomor_urut: 15,
    tipe_soal: "Klarikal",
    kesulitan: "Medium",
    teks_soal: "Cocokkan dua kolom teks berikut: 7K2NM8L | 7K2NM8L",
    pilihan_jawaban: [
      { value: "A", label: "SAMA" },
      { value: "B", label: "BERBEDA" },
    ],
    kunci_jawaban: "A",
  },
];
```

---

### Step 3: Update `prisma/seed.ts`

Replace or update the main seed file:

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { RIASEC_QUESTIONS, DAT_QUESTIONS } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Clear existing quiz data (optional, for clean slate)
  await prisma.quiz.deleteMany({});
  console.log("Cleared existing quiz data");

  // Seed RIASEC questions
  for (const q of RIASEC_QUESTIONS) {
    await prisma.quiz.create({
      data: {
        tipe_soal: q.tipe_soal,
        domain: q.domain,
        kesulitan: q.kesulitan,
        nomor_urut: q.nomor_urut,
        teks_soal: q.teks_soal,
        pilihan_jawaban: q.pilihan_jawaban,
        kunci_jawaban: q.kunci_jawaban,
      },
    });
  }
  console.log(`✅ Seeded ${RIASEC_QUESTIONS.length} RIASEC questions`);

  // Seed DAT questions
  for (const q of DAT_QUESTIONS) {
    await prisma.quiz.create({
      data: {
        tipe_soal: q.tipe_soal,
        kesulitan: q.kesulitan,
        nomor_urut: q.nomor_urut,
        teks_soal: q.teks_soal,
        pilihan_jawaban: q.pilihan_jawaban,
        kunci_jawaban: q.kunci_jawaban,
        penjelasan: q.penjelasan,
      },
    });
  }
  console.log(`✅ Seeded ${DAT_QUESTIONS.length} DAT questions`);

  const totalQuestions = await prisma.quiz.count();
  console.log(`\n✅ Database seed completed! Total questions: ${totalQuestions}`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

### Step 4: Run Seeding

```bash
# 1. Ensure Prisma client is generated
npx prisma generate

# 2. Push schema to database (if not done yet)
npx prisma db push

# 3. Run seed script
npm run prisma:seed
# or
npx ts-node --esm prisma/seed.ts
```

**Expected Output**:
```
Starting database seed...
Cleared existing quiz data
✅ Seeded 36 RIASEC questions
✅ Seeded 15 DAT questions

✅ Database seed completed! Total questions: 51
```

---

## 🧪 Verify Seeding

Open Prisma Studio to inspect:

```bash
npx prisma studio
```

Check:
- [ ] Quiz table shows 51 records
- [ ] Each has tipe_soal, domain (for RIASEC), teks_soal, pilihan_jawaban (JSON), kunci_jawaban
- [ ] RIASEC items have domains (R, I, A, S, E, C)
- [ ] DAT items have tipe_soal (Verbal, Numerik, Klarikal)

---

## ✅ Phase 3.1 Checklist

```
[ ] Prisma schema updated with new Quiz fields
[ ] prisma/seed-data.ts created with 51 questions
[ ] prisma/seed.ts updated to import & seed all data
[ ] npm run prisma:seed runs without errors
[ ] Prisma Studio shows 51 Quiz records
[ ] Each record has correct structure (tipe_soal, pilihan_jawaban as JSON, etc.)
[ ] Ready to build Quiz UI (Phase 3.2)
```

---

**Next**: After this seeding is done, proceed to Phase 3.2 (Quiz UI) 🚀
