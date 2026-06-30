# Dokumen YoMap Terpadu (Knowledge Base)

Dokumen ini merupakan integrasi dari data platform pengujian, rekomendasi karier, rekomendasi jurusan, dan profil kepribadian pengguna. Gunakan file ini sebagai sumber kebenaran (source of truth) untuk logika aplikasi dan database.

---

## Bagian 1: DAT Test Platform (Kuis & Logika)

### Sub-tes 1: Penalaran Verbal
* **Sifat:** Analisis Logika
* **Bobot:** 20 poin per soal (Max 100)

| Soal | Materi/Logika |
| :--- | :--- |
| V1 | Hubungan taksonomi (Sapi-Mamalia, Ayam-Unggas) |
| V2 | Hubungan aksi-kebutuhan (Minum-Haus, Istirahat-Lelah) |
| V3 | Hubungan pemimpin-anggota (Guru-Siswa, Konduktor-Orkes) |
| V4 | Hubungan material (Semen-Dinding, Bingkai-Foto) |
| V5 | Hubungan proses (Matahari-Fusi, Garam-Kristalisasi) |

### Sub-tes 2: Kemampuan Numerik
* **Bobot:** 20 poin per soal (Max 100)

| Soal | Materi/Logika |
| :--- | :--- |
| N1 | Perbandingan berbalik nilai (6 pekerja, 12 hari -> 8 pekerja, 9 hari) |
| N2 | Persentase Keuntungan (Modal 150k, Untung 20% -> Jual 180k) |
| N3 | Aljabar Linear (4x - 7 = 2x + 9 -> x=8 -> 8^2 - 5 = 59) |
| N4 | Rata-rata Gabungan (4x75 + x = 5x78 -> x=92) |
| N5 | Persamaan Linear 2 Variabel (Umur Ayah 39, Andi 9) |

---

## Bagian 2: Job Recommendation (RIASEC)

Daftar karier berdasarkan kode RIASEC:

| Kode | Peluang Karier |
| :--- | :--- |
| RIA | Arsitek, Desainer Interior, PWK, Desainer Produk, Insinyur Lingkungan, Surveyor, GIS Analyst, Konsultan Tata Ruang, Manajer Proyek Konstruksi |
| RIS | Dokter, Dokter Gigi, Perawat, Bidan, Apoteker, Fisioterapis, Ahli Gizi, Epidemiolog, Penyuluh Kesehatan |
| RIE | Insinyur Industri, Software Developer, Analis Sistem, Insinyur Elektro/Mesin, Analis Logistik, Manajer Proyek/Operasional |
| RIC | Ilmuwan Data, Analis Data, Programmer, Aktuaris, Statistisi, Insinyur Fisika, Konsultan TI |
| RAI | Arsitek, Desainer Interior/Produk/Grafis, Ilustrator, Seniman, Visual Merchandiser |
| RAS | Guru, Dosen, Instruktur, Pengembang Kurikulum, Peneliti Pendidikan, Laboran |
| RAE | Manajer Proyek/Operasional, Konsultan Bisnis, Wirausahawan, Analis Logistik, Insinyur Industri |
| RAC | Analis Sistem, Konsultan TI, Analis Bisnis, Aktuaris, Auditor Sistem, Wirausahawan Digital |
| RSI | Dokter, Perawat, Fisioterapis, Apoteker, Psikolog, Konselor, Penyuluh Kesehatan |
| RSA | Psikolog, Guru, Guru PAUD, Guru BK, Konselor, Pengembang Kurikulum, Trainer |
| RSE | Ahli K3, Manajer RS, Psikolog, Penyuluh Kesehatan, Konsultan K3, Auditor Keselamatan |
| RSC | Manajer RS, Administrator Kesehatan, Analis Sistem Info Kes, ASN, Analis Kebijakan Kesehatan |
| IRA/IRS/IRE/... | *(Data lengkap tersedia dalam file source)* |

---

## Bagian 3: Major Recommendation (Jurusan)

Daftar jurusan linear berdasarkan kode RIASEC:

| Kode | Jurusan yang Linear |
| :--- | :--- |
| RIA | Arsitektur, Arsitektur Interior, PWK, Desain Produk, Teknik Lingkungan, Geodesi |
| RIS | Kedokteran, Kedokteran Gigi, Keperawatan, Kebidanan, Farmasi, Fisioterapi, Gizi, Kesmas |
| RIE | Teknik Industri, Teknik Informatika, Sistem Informasi, Teknik Elektro/Mesin, Teknik Logistik |
| RIC | Teknik Informatika, Ilmu Komputer, Sistem Informasi, Data Science, Statistika, Aktuaria |
| RAI | Arsitektur, Arsitektur Interior, Desain Produk, DKV, Seni Rupa, PWK |
| RAS | Pendidikan Teknik, Pendidikan Vokasi, Pendidikan IPA/Biologi/Fisika |
| RAE | Teknik Industri, Manajemen Rekayasa, Bisnis Digital, Arsitektur, Logistik |
| RAC | Sistem Informasi, Teknik Industri, Bisnis Digital, Logistik, Aktuaria |

---

## Bagian 4: Profil Kepribadian & Fun Facts (Saintek/Soshum)

### Kelompok Saintek (🧪)
* **Easy:** Pemahaman konsep > hafalan, penggunaan AI sebagai asistensi, tidak SKS (Sistem Kebut Semalam), penasaran teknologi baru.
* **Medium:** Ketelitian angka, tugas individu vs diskusi, verifikasi AI, etika pengerjaan tugas (tidak copas).
* **Hard:** Mencari letak kesalahan tugas, kepuasan menemukan solusi soal sulit, kerja sama tim, keingintahuan mekanisme proses (kepo mekanis).

*(Catatan: Bagian Soshum mengikuti struktur serupa dengan fokus pada debat perspektif dan analisis masyarakat)*
