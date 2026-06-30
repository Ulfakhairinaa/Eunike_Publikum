# Product Requirements Document (PRD): YO-MAP MVP

**Nama Dokumen:** prd-yo-map-mvp-final.md

**Nama Produk:** YO-MAP (Platform Inovasi Tes Minat Bakat Berbasis Game)

**Target Timeline:** 48 Jam (2 Hari Eksplorasi & Implementasi)

**Penulis:** Senior Product Manager

---

## 1. Tujuan & Latar Belakang (Objective & Background)

### Latar Belakang Eksositem

Dunia pendidikan di Indonesia saat ini menghadapi krisis orientasi karier yang cukup masif. Data menunjukkan bahwa sebanyak 61% mahasiswa merasa mengambil jurusan kuliah yang salah, sementara 70% siswa Sekolah Menengah Atas (SMA) mengalami kebingungan akut saat harus menentukan arah masa depan akademis dan profesional mereka. Metode konvensional yang mengandalkan tes tertulis statis sering kali dirasa membosankan, kaku, dan kurang mampu menggambarkan dinamika tugas riil di program studi tertentu. Akibatnya, keputusan krusial ini sering kali diambil tanpa pemahaman mendalam, yang berujung pada tingginya angka ketidakpuasan studi dan rendahnya produktivitas di masa depan.

### Solusi & Tujuan Produk

YO-MAP hadir sebagai solusi navigasi karier cerdas bagi generasi muda (Gen Z) dengan memadukan ilmu psikometri terapan dan mekanisme permainan modern. Platform ini mengintegrasikan dua instrumen evaluasi utama, yaitu tes minat **RIASEC (Holland Theory of Career Choice)** dan tes bakat **DAT (Differential Aptitude Test)** yang telah diadaptasi.

Tujuan utama pengembangan Minimum Viable Product (MVP) YO-MAP dalam siklus sprint 48 jam ini adalah:

* Memberikan validasi data minat dan bakat yang presisi melalui kalkulasi algoritma pencocokan profil.
* Menyediakan pengalaman simulasi jurusan yang interaktif lewat fitur *Career Skill Mission* untuk mengikis kesenjangan informasi antara ekspektasi siswa dan realitas program studi.
* Menghasilkan purwarupa produk fungsional yang stabil, andal, dan siap diuji coba dalam skala terbatas guna membangun fondasi ekosistem pendidikan yang berkelanjutan.

---

## 2. Target Pengguna (Target Audience)

### Pengguna Utama: Siswa SMA (Kelas 10, 11, dan 12) / Generasi Z

Siswa aktif yang sedang bersiap menghadapi transisi menuju jenjang perguruan tinggi.

* **Karakteristik Psikologis:** Memiliki tingkat kecemasan yang tinggi terkait masa depan, mudah merasa bosan dengan teks panjang, namun memiliki ketertarikan tinggi terhadap visualisasi interaktif dan sistem berbasis pencapaian (gamifikasi).
* **Karakteristik Teknis:** Pengguna harian ponsel pintar (mobile-first), terbiasa dengan antarmuka yang responsif, cepat, dan menuntut umpan balik instan (instant feedback) tanpa hambatan pemuatan data yang lama.

### Pengguna Sekunder: Guru Bimbingan Konseling (BK)

Tenaga pendidik di sekolah yang berfungsi sebagai supervisor dan konselor utama siswa.

* **Karakteristik Kebutuhan:** Memerlukan data pendukung yang valid, terstruktur, dan objektif untuk mempermudah proses pengarahan karier siswa. Pada fase MVP ini, guru BK bertindak sebagai peninjau hasil akhir yang dicetak atau ditampilkan langsung dari layar siswa.

---

## 3. Kriteria Rilis & Metrik Keberhasilan (Release Criteria & Success Metrics)

Untuk memastikan bahwa produk dapat dideploy dengan aman dan bekerja optimal di bawah tenggat waktu 2 hari, rilis MVP ini wajib memenuhi kriteria kuantitatif dan kualitatif berikut:

### Kriteria Fungsionalitas Inti (Core Functionality)

* **Alur Pengguna Tanpa Hambatan:** Pengguna harus dapat melakukan registrasi akun baru, melakukan proses login, menyelesaikan seluruh rangkaian soal RIASEC dan DAT, melihat tepat 5 rekomendasi jurusan, serta memainkan minimal 1 misi permainan dasar hingga selesai tanpa ada hambatan sistem.

### Kriteria Performa Fisik (Performance Metrics)

* **Kecepatan Muat (Page Load Time):** Mengingat target pengguna menggunakan perangkat mobile dengan variasi jaringan, waktu muat halaman utama dan modul tes dengan implementasi Next.js Server Side Rendering (SSR) wajib berada di bawah **1.5 detik** pada koneksi internet standar (4G).

### Kriteria Keandalan Sistem (Reliability)

* **Akurasi Algoritma:** Tingkat kegagalan atau galat (error rate) pada fungsi perhitungan matematika di balik pencocokan skor tes RIASEC/DAT dengan standar data profil jurusan (*major profiles*) harus bernilai **0%**. Tidak boleh ada nilai null atau salah hitung yang menyebabkan rekomendasi kosong.

### Kriteria Kualitas Kode (Code Quality)

* **TypeScript Quality Gate:** Seluruh basis kode wajib lolos pengecekan tipe data (`typechecking`) TypeScript 100% dengan mode ketat (*strict mode*). Penggunaan tipe data `any` dilarang keras demi menjaga stabilitas aplikasi saat runtime.

---

## 4. Kebutuhan Fungsional (Functional Requirements)

Berikut adalah daftar kebutuhan fungsional sistem yang bersifat mutlak dan harus diimplementasikan oleh tim pengembang tanpa ambiguitas:

* **FR-1 (Autentikasi & Manajemen Profil):** Sistem wajib menyediakan fitur pendaftaran (registrasi) dan masuk (login) menggunakan kombinasi email dan kata sandi yang diamankan oleh Supabase Auth. Pada saat login pertama kali, sistem wajib memaksa pengguna untuk melengkapi data profil dasar (Nama Lengkap, Asal Sekolah, dan Gender) sebelum masuk ke dashboard.
* **FR-2 (Penyimpanan Data Tes Mandiri):** Sistem wajib menangani penyimpanan setiap jawaban soal dari pengguna ke dalam tabel database `user_answers` secara asinkron (*asynchronous*) per soal atau per halaman. Hal ini untuk mencegah hilangnya progres pengerjaan apabila terjadi pemutusan koneksi internet secara mendadak. Setelah tes selesai, skor kumulatif wajib langsung dihitung dan disimpan di tabel `analysis_results`.
* **FR-3 (Algoritma Rekomendasi):** Sistem wajib menjalankan fungsi komparasi otomatis antara data perolehan skor dimensi RIASEC dan DAT milik pengguna di tabel `analysis_results` dengan profil nilai ideal yang tersimpan di tabel `major_profiles`. Proses pencocokan menggunakan rumus selisih absolut (kedekatan jarak skor), di mana selisih terkecil merepresentasikan kecocokan tertinggi.
* **FR-4 (Output Rekomendasi):** Sistem wajib membatasi dan menampilkan tepat **5 jurusan terbaik** yang memiliki nilai kecocokan (*match score*) tertinggi pada halaman khusus `/recommendation`. Setiap opsi jurusan wajib dilengkapi dengan persentase kecocokan dan tombol aksi langsung untuk memulai simulasi.
* **FR-5 (Gamifikasi Misi Berjenjang):** Sistem wajib menerapkan validasi kondisi gerbang (Unlock System) pada modul permainan. Misi level 2 atau misi lanjutan pada suatu jurusan tertentu harus terkunci (*disabled*) dan tidak dapat diakses oleh pengguna sebelum mereka berhasil mengumpulkan nilai di atas atau sama dengan `minimum_point` pada misi level 1.
* **FR-6 (Pembaruan Status Progres):** Sistem wajib melakukan mutasi data status pengerjaan misi pada tabel `game_progress` secara real-time. Status yang didukung adalah `locked` (terkunci), `unlocked` (terbuka dan siap dimainkan), dan `completed` (selesai dikerjakan).

---

## 5. Diluar Cakupan (Non-Goals)

Untuk menjaga fokus tim pengembang dan memastikan aplikasi dapat diselesaikan secara penuh dalam waktu 48 jam, fitur-fitur berikut dinyatakan berada di luar cakupan MVP dan **tidak akan dikerjakan**:

* Integrasi dengan gerbang pembayaran (*Payment Gateway*) maupun implementasi skema fitur premium berbayar.
* Pembuatan panel kendali khusus (*Dashboard Admin/Supervisor*) yang kompleks untuk Guru BK dengan kendali akses berbasis peran (RBAC).
* Penerapan animasi grafis 3D atau rendering engine interaktif pada modul permainan. Seluruh permainan disederhanakan menggunakan antarmuka kartu (UI Card-based) dengan interaksi klik pilihan.
* Fitur asisten otomatis berbasis kecerdasan buatan (*Chatbot AI Counselor*) untuk sesi konsultasi mandiri.

---

## 6. Arsitektur Data & Spesifikasi Teknis (Data Architecture & Tech Stack)

### Spesifikasi Teknologi (Tech Stack)

* **Framework Utama:** Next.js 14+ dengan arsitektur App Router untuk optimalisasi rendering performa tinggi.
* **Bahasa Pemrograman:** TypeScript dengan konfigurasi *strict mode* aktif.
* **Manajemen UI & Gaya:** Tailwind CSS untuk efisiensi penulisan gaya yang responsif, dipadukan dengan pustaka komponen Shadcn UI.
* **Database & Autentikasi:** Supabase PostgreSQL sebagai penyimpanan data utama beserta modul Supabase Auth terintegrasi.
* **Object-Relational Mapping (ORM):** Prisma ORM untuk menjembatani komunikasi mutasi data dari server Next.js ke PostgreSQL.
* **Manajemen Status & Caching:** TanStack Query (React Query) untuk melakukan mekanisme caching data soal, sehingga mengurangi beban *refetch* data dari database yang tidak efisien.

### Struktur Skema Basis Data (Prisma Schema Reference)

Berikut adalah struktur basis data inti yang wajib diterapkan pada file `schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id              String         @id @default(uuid())
  email           String         @unique
  name            String
  school          String
  gender          String
  createdAt       DateTime       @default(now())
  assessments     Assessment[]
  game_progress   GameProgress[]
}

model Assessment {
  id              String          @id @default(uuid())
  user_id         String
  user            User            @relation(fields: [user_id], references: [id])
  status          String          // CONTOH: "PENDING", "COMPLETED"
  createdAt       DateTime        @default(now())
  analysis        AnalysisResult?
}

model Question {
  id              String         @id @default(uuid())
  type            String         // CONTOH: "RIASEC", "DAT"
  category        String         // CONTOH: "Realistic", "Verbal"
  question_text   String
  option_a        String
  option_b        String
  option_c        String
  option_d        String
  correct_answer  String?        // Khusus untuk soal DAT yang memiliki kunci jawaban
  score_weight    Int            @default(1)
}

model AnalysisResult {
  id              String         @id @default(uuid())
  assessment_id   String         @unique
  assessment      Assessment     @relation(fields: [assessment_id], references: [id])
  riasec_scores   Json           // Menyimpan objek skor { R: 20, I: 15, dst }
  dat_scores      Json           // Menyimpan objek skor { Verbal: 80, Numerical: 70 }
  createdAt       DateTime       @default(now())
}

model Major {
  id              String         @id @default(uuid())
  name            String
  description     String
  profiles        MajorProfile[]
  missions        GameMission[]
}

model MajorProfile {
  id              String         @id @default(uuid())
  major_id        String
  major           Major          @relation(fields: [major_id], references: [id])
  ideal_riasec    Json           // Atribut skor acuan ideal jurusan
  ideal_dat       Json           // Atribut skor acuan bakat ideal jurusan
}

model GameMission {
  id              String         @id @default(uuid())
  major_id        String
  major           Major          @relation(fields: [major_id], references: [id])
  title           String
  level           Int
  min_point       Int
  questions       GameQuestion[]
  progress        GameProgress[]
}

model GameQuestion {
  id              String         @id @default(uuid())
  mission_id      String
  mission         GameMission    @relation(fields: [mission_id], references: [id])
  scenario_text   String
  option_a        String
  option_b        String
  option_c        String
  option_d        String
  correct_option  String
  points          Int
}

model GameProgress {
  id              String         @id @default(uuid())
  user_id         String
  user            User           @relation(fields: [user_id], references: [id])
  mission_id      String
  mission         GameMission    @relation(fields: [mission_id], references: [id])
  status          String         // NILAI: "locked", "unlocked", "completed"
  current_points  Int            @default(0)
  updatedAt       DateTime       @updatedAt
}

```

---

## 7. Fitur & User Stories Detil (Features & Detailed User Stories)

Setiap cerita pengguna dibawah ini dipecah secara granular agar dapat diselesaikan secara fokus dalam satu sesi pengerjaan tunggal tanpa interupsi.

### Story 1: Autentikasi & Registrasi Pengguna

* **Deskripsi Singkat:** Sebagai seorang siswa SMA, saya ingin mendaftar dan masuk ke dalam platform YO-MAP menggunakan alamat email saya agar seluruh data pengerjaan tes serta poin game saya tersimpan dengan aman dan tidak hilang saat aplikasi ditutup.
* **Perilaku Sistem (Behavior):** Sistem menampilkan form registrasi yang bersih. Ketika pengguna memasukkan data, skema validasi Zod akan memeriksa validitas format email dan kekuatan kata sandi di sisi klien. Jika valid, Supabase Auth akan memproses pembuatan user baru, memicu pembuatan baris data pada tabel publik `User`, dan mengarahkan pengguna secara mulus ke rute `/dashboard`.
* **Kriteria Penerimaan (Acceptance Criteria):**
* Form registrasi wajib meminta input: Nama Lengkap, Asal Sekolah, Gender, Email, dan Password.
* Validasi form menggunakan pustaka Zod wajib memblokir proses registrasi jika format email tidak sah atau kata sandi kurang dari 6 karakter.
* Data pengguna baru harus terverifikasi masuk ke dalam sistem manajemen pengguna Supabase Auth dan tabel `User`.
* Sistem wajib mengarahkan rute secara otomatis ke halaman `/dashboard` pasca login sukses.
* Typecheck passes.
* Verify in browser using dev-browser skill (Pastikan pesan error validasi muncul di bawah input teks secara instan jika input tidak sesuai aturan).



### Story 2: Dashboard Status & Ringkasan Progres

* **Deskripsi Singkat:** Sebagai seorang pengguna yang telah terdaftar, saya ingin melihat ringkasan status pengerjaan instrumen evaluasi (RIASEC & DAT) serta posisi pencapaian simulasi game saya melalui satu halaman utama terpusat.
* **Perilaku Sistem (Behavior):** Halaman `/dashboard` bertindak sebagai pusat navigasi pengguna. Sistem akan melakukan pengecekan status pada tabel `Assessment` dan `GameProgress` milik id user terkait. Jika record belum ada atau berstatus pending, sistem memunculkan tombol interaktif berwarna kontras untuk memicu aksi pengerjaan pertama kali.
* **Kriteria Penerimaan (Acceptance Criteria):**
* Halaman `/dashboard` wajib merender 3 kartu indikator utama: Status Pengerjaan Tes RIASEC, Status Pengerjaan Tes DAT, dan Total Progres Misi Game.
* Jika status instrumen tes di database bernilai kosong atau belum dikerjakan, kartu wajib menampilkan label peringatan berwarna kuning dan tombol bertuliskan "Mulai Tes".
* Jika status instrumen tes sudah selesai dikerjakan (`COMPLETED`), kartu wajib berubah memuat label hijau bertuliskan "Selesai" dan tombol beralih fungsi menjadi "Lihat Hasil Analisis".
* Antarmuka halaman wajib mengimplementasikan breakpoints responsif untuk kenyamanan tampilan di layar ponsel pintar hingga monitor komputer desktop.
* Typecheck passes.
* Verify in browser using dev-browser skill (Pastikan layout kartu tidak berantakan atau bertumpuk saat diuji pada resolusi lebar layar handphone minimum 360px).



### Story 3: Modul Evaluasi Minat RIASEC

* **Deskripsi Singkat:** Sebagai seorang siswa, saya ingin menjawab rangkaian pertanyaan minat berbasis aktivitas harian agar kecenderungan kepribadian karier saya dapat dipetakan secara akurat ke dalam 6 dimensi Holland.
* **Perilaku Sistem (Behavior):** Sistem menarik daftar soal tipe `RIASEC` dari tabel `Question`. Pertanyaan disajikan secara sekuensial dengan pilihan jawaban berupa skala ordinal Likert (1 hingga 5). Setiap kali tombol opsi ditekan, state aplikasi lokal akan menyimpan jawaban tersebut untuk kemudian diakumulasikan ke masing-masing dimensi (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) saat tombol submit ditekan di akhir halaman.
* **Kriteria Penerimaan (Acceptance Criteria):**
* Menyajikan seluruh butir soal RIASEC dengan antarmuka pilihan berupa radio button berskala 1 hingga 5 (Sangat Tidak Setuju hingga Sangat Setuju).
* Sistem wajib menghitung total skor per dimensi secara presisi tanpa ada pembulatan yang salah pada akhir pengerjaan.
* Hasil akhir perhitungan berupa objek JSON wajib tersimpan sempurna pada kolom `riasec_scores` di dalam tabel `AnalysisResult`.
* Transisi antar nomor soal wajib berjalan mulus menggunakan client-side state management tanpa memicu pemuatan ulang layar secara utuh (*full page reload*).
* Typecheck passes.
* Verify in browser using dev-browser skill (Pastikan status indikator kemajuan berupa progress bar bertambah secara proporsional setiap kali soal dijawab).



### Story 4: Modul Evaluasi Bakat Kognitif DAT

* **Deskripsi Singkat:** Sebagai seorang siswa, saya ingin menyelesaikan tes kemampuan kognitif dasar untuk mengukur potensi bakat saya pada kategori kompetensi verbal, numerik, dan klerikal.
* **Perilaku Sistem (Behavior):** Sistem memuat soal-soal pilihan ganda tipe `DAT`. Setiap soal memiliki empat pilihan jawaban dengan satu opsi yang bernilai benar sesuai field `correct_answer` di database. Ketika pengguna mengirimkan lembar jawaban, sistem di sisi server melakukan pencocokan jawaban pengguna dengan kunci jawaban, menjumlahkan bobot nilai yang benar, dan memperbarui baris data `AnalysisResult` terkait.
* **Kriteria Penerimaan (Acceptance Criteria):**
* Menyajikan soal pilihan ganda (opsi A, B, C, D) yang mencakup tiga sub-kategori uji: Verbal, Numerical, dan Clerical.
* Sistem wajib mengomparasikan input jawaban user secara ketat dengan field `correct_answer` di basis data untuk menentukan perolehan poin.
* Hasil perhitungan akumulasi nilai bakat wajib memperbarui field `dat_scores` pada baris data user yang bersangkutan di tabel `AnalysisResult`.
* Elemen tombol kirim (*submit*) wajib menampilkan indikator berputar (*loading spinner state*) dan status dinonaktifkan (*disabled*) sesaat setelah diklik guna menghindari pengiriman data ganda akibat klik berulang.
* Typecheck passes.
* Verify in browser using dev-browser skill (Pastikan transisi halaman dari tes DAT menuju halaman kalkulasi tidak memicu error memori halaman).



### Story 5: Hasil Analisis & Rekomendasi Jurusan

* **Deskripsi Singkat:** Sebagai seorang pengguna yang telah menuntaskan seluruh rangkaian tes, saya ingin melihat 5 rekomendasi program studi perkuliahan yang paling sesuai dengan profil minat kepribadian dan bakat kognitif saya.
* **Perilaku Sistem (Behavior):** Rute `/recommendation` memicu fungsi pencocokan. Fungsi ini mengambil data `riasec_scores` dan `dat_scores` milik pengguna, mengukur kedekatan nilai tersebut terhadap seluruh entitas di tabel `MajorProfile`, menyortir hasil dari selisih terkecil ke terbesar, lalu memotong data untuk menampilkan 5 entitas teratas.
* **Kriteria Penerimaan (Acceptance Criteria):**
* Sistem wajib mengeksekusi logika kalkulasi pencocokan profil segera setelah halaman diakses oleh user berstatus lengkap.
* Halaman wajib merender tepat 5 kartu program studi perkuliahan dengan urutan peringkat kecocokan paling tinggi di posisi teratas.
* Setiap kartu informasi jurusan wajib memuat komponen tombol aksi "Lihat Detail Deskripsi" dan tombol "Mulai Simulasi Misi".
* Komponen visual kartu wajib memanfaatkan standarisasi desain komponen dari pustaka Shadcn Card untuk menjaga konsistensi visual.
* Typecheck passes.
* Verify in browser using dev-browser skill (Pastikan jika pengguna mencoba mengakses halaman ini secara ilegal sebelum menyelesaikan kedua tes, sistem secara otomatis me-redirect pengguna kembali ke dashboard dengan pesan peringatan).



### Story 6: Career Skill Mission (Simulasi Game)

* **Deskripsi Singkat:** Sebagai seorang siswa yang bingung tentang realitas dunia perkuliahan, saya ingin memainkan misi simulasi berbasis studi kasus praktis agar saya mendapatkan gambaran nyata mengenai tugas dan tantangan harian di jurusan tersebut.
* **Perilaku Sistem (Behavior):** Ketika tombol simulasi diklik, sistem memuat data dari tabel `GameMission` dan `GameQuestion` yang terikat dengan ID jurusan pilihan. Sistem memeriksa apakah status misi tersebut pada tabel `GameProgress` bernilai `unlocked` atau `completed`. Jika bernilai `locked`, akses ditolak. Di akhir simulasi, jika perolehan poin menjawab benar melampaui `min_point`, status misi berikutnya diubah menjadi `unlocked`.
* **Kriteria Penerimaan (Acceptance Criteria):**
* Sistem berhasil memuat daftar pertanyaan studi kasus simulasi dari database sesuai dengan parameter program studi yang dipilih.
* Tombol navigasi untuk misi permainan yang masih berstatus terkunci (`locked`) wajib diatur ke dalam mode tidak aktif (*disabled*) dan menampilkan ikon gembok kecil.
* Pengguna menerima feedback poin secara instan untuk setiap pertanyaan simulasi yang berhasil dijawab dengan benar.
* Apabila total akumulasi nilai akhir >= batas nilai minimal (`min_point`), sistem wajib merubah status misi berjalan menjadi `completed` dan membuka gembok akses misi level berikutnya menjadi `unlocked` pada tabel `GameProgress`.
* Layar akhir permainan wajib memicu kemunculan dialog modal penanda keberhasilan atau kegagalan menggunakan komponen Shadcn Dialog atau AlertDialog.
* Typecheck passes.
* Verify in browser using dev-browser skill (Pastikan poin akhir tersimpan dengan benar di database sebelum komponen modal dialog ditutup oleh pengguna).



---

## 8. Spesifikasi UI/UX & Pemetaan Komponen (UI/UX Specifications)

Untuk mempercepat pengerjaan visual tanpa mengorbankan konsistensi pengalaman pengguna, seluruh komponen wajib mengacu pada pemetaan pustaka komponen **Shadcn UI** berikut:

| Komponen Antarmuka | Nama Komponen Shadcn | Perilaku & Peruntukan Penggunaan |
| --- | --- | --- |
| **Kerangka Tata Letak Global** | `Sidebar`, `Header` | Digunakan sebagai menu navigasi utama di sisi kiri layar pada mode desktop, dan beralih menjadi hamburger menu lipat otomatis pada mode tampilan mobile. |
| **Input Pilihan Ganda Tes** | `RadioGroup`, `Label` | Digunakan pada halaman kuesioner RIASEC dan DAT. Setiap opsi radio button memiliki area klik yang sensitif dan memicu perubahan warna background saat dipilih. |
| **Indikator Kemajuan Tes** | `Progress` | Baris indikator visual di bagian atas modul kuesioner untuk menunjukkan rasio jumlah soal yang telah dijawab terhadap total keseluruhan soal secara real-time. |
| **Kartu Tampilan Informasi** | `Card`, `CardHeader`, `CardBody` | Digunakan pada halaman dashboard untuk membungkus ringkasan status instrumen, serta pada halaman rekomendasi untuk menyajikan ringkasan nama jurusan. |
| **Penyajian Data Rekomendasi** | `Table` atau `List Array` | Digunakan untuk menyusun visualisasi peringkat 5 besar jurusan kuliah secara terstruktur lengkap dengan kolom persentase nilai kecocokan. |
| **Konfirmasi Aksi Krusial** | `AlertDialog` | Digunakan untuk mencegat pengguna ketika mereka menekan tombol kirim lembar ujian, guna memastikan tidak ada soal yang tidak sengaja terlewat. |
| **Status Akhir Simulasi Game** | `Dialog` atau `Modal` | Jendela pop-up yang muncul secara instan di tengah layar saat misi game selesai untuk menampilkan rangkuman perolehan poin dan status kelulusan misi. |

---

## 9. Rencana Eksekusi Utama (Master Execution Plan / Roadmap)

Proses pengerjaan dan penulisan kode dipadatkan ke dalam siklus ketat 48 jam yang terbagi menjadi 6 sesi terfokus sebagai berikut:

### Hari 1: Arsitektur Fondasi & Modul Evaluasi Utama

#### Sesi Pagi (Jam 08:00 - 12:00) - Inisialisasi Proyek & Setup Lingkungan Kerja

* **Target Fokus:** Penyusunan fondasi dasar aplikasi.
* **Rincian Tugas:** Inisialisasi framework Next.js 14 dengan struktur App Router, konfigurasi Tailwind CSS, pemasangan pustaka komponen dasar Shadcn UI, konfigurasi skema Prisma ORM, serta penghubungan string koneksi backend ke layanan Supabase PostgreSQL.

#### Sesi Siang (Jam 13:00 - 17:00) - Implementasi Basis Data & Database Seeding

* **Target Fokus:** Kesiapan struktur penyimpanan data backend.
* **Rincian Tugas:** Eksekusi perintah migrasi file `schema.prisma` ke database Supabase. Penulisan dan pengeksekusian file skrip otomatis (`seed.ts`) untuk memasukkan ratusan data master pertanyaan kuesioner RIASEC, soal pilihan ganda DAT, profil nilai ideal jurusan (*major profiles*), dan daftar pertanyaan simulasi game ke dalam database.

#### Sesi Malam (Jam 19:00 - 23:00) - Pengembangan Modul Evaluasi & Alur Pengguna

* **Target Fokus:** Penyelesaian fungsionalitas front-end kuesioner tes.
* **Rincian Tugas:** Perakitan komponen form halaman registrasi dan login terikat Supabase Auth. Pembuatan halaman antarmuka kuesioner tes RIASEC dan DAT, penanganan manajemen state penampung jawaban, serta pembuatan API Route untuk menangani pengiriman data lembar jawaban ke database.

---

### Hari 2: Logika Analisis, Gamifikasi, & Deployment Global

#### Sesi Pagi (Jam 08:00 - 12:00) - Implementasi Algoritma Pencocokan Profil & Halaman Hasil

* **Target Fokus:** Penyelesaian fungsi inti kecerdasan rekomendasi jurusan.
* **Rincian Tugas:** Penulisan fungsi backend `CalculateResult` untuk mengolah kalkulasi skor psikometri. Pembuatan fungsi komparasi jarak absolut untuk membandingkan skor user vs profil ideal jurusan. Pembuatan halaman visualisasi `/recommendation` untuk menampilkan top 5 program studi terbaik.

#### Sesi Siang (Jam 13:00 - 17:00) - Pengembangan Modul Gamifikasi Simulasi Karier

* **Target Fokus:** Penyelesaian fitur interaktif Career Skill Mission.
* **Rincian Tugas:** Pembuatan komponen kartu simulasi misi perkuliahan, penulisan fungsi validasi gerbang buka-tutup misi berdasarkan poin minimal, pengimplementasian fitur verifikasi jawaban benar/salah secara instan di sisi klien, serta mekanisme mutasi pembaruan data tabel `GameProgress`.

#### Sesi Malam (Jam 19:00 - 23:00) - Pengujian Akhir, Pembersihan Kode, & Deployment

* **Target Fokus:** Stabilitas dan peluncuran produk ke server publik.
* **Rincian Tugas:** Pengecekan seluruh tipe data menggunakan perintah `npm run build` atau `npx tsc` untuk memastikan tingkat kelulusan typecheck strict 100%. Pengujian fungsional menyeluruh dari proses pendaftaran akun hingga penyelesaian misi game. Eksekusi deployment aplikasi web ke platform Vercel dan sinkronisasi produksi akhir pada Supabase.

---

> **Catatan Tim Pengembang:** Dokumen Persyaratan Produk (PRD) ini bersifat mengikat sepanjang siklus sprint 2 hari ini berlangsung. Seluruh anggota tim teknis wajib menjadikan skema data dan kriteria penerimaan di atas sebagai satu-satunya acuan kebenaran fungsional demi mencegah terjadinya pergeseran ruang lingkup proyek (*scope creep*).