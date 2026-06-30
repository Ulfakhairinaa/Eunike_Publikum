## Dokumen Software Requirements Specification (SRS): YO-MAP MVP

**Nama Produk:** YO-MAP (Platform Inovasi Tes Minat Bakat Berbasis Game)
**Versi:** 1.0 (Minimum Viable Product - MVP)
**Target Siklus:** 48 Jam (Sprint Pengembang)

---

### 1. Pendahuluan

**Tujuan Dokumen**
Dokumen SRS ini bertujuan untuk mendefinisikan seluruh spesifikasi kebutuhan perangkat lunak untuk pengembangan Minimum Viable Product (MVP) YO-MAP. Dokumen ini menjadi acuan mutlak bagi tim pengembang (frontend, backend, dan database engineer) untuk memastikan produk dibangun sesuai dengan kriteria fungsional dan non-fungsional yang telah disepakati dalam batas waktu 48 jam.

**Ruang Lingkup**
YO-MAP adalah aplikasi berbasis web yang berfungsi sebagai platform navigasi karier cerdas bagi siswa SMA. Sistem memadukan instrumen evaluasi minat (RIASEC) dan bakat (DAT) dengan mekanisme permainan simulasi jurusan. Ruang lingkup dibatasi pada fitur autentikasi, penyelesaian tes terpusat, algoritma pencocokan rekomendasi program studi (maksimal 5), dan satu siklus permainan simulasi.

**Definisi, Akronim, dan Singkatan**

* **MVP:** Minimum Viable Product, versi produk dengan fitur dasar yang siap diluncurkan.
* **RIASEC:** Holland Theory of Career Choice (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
* **DAT:** Differential Aptitude Test (Kemampuan verbal, numerik, dan klerikal).
* **SSR:** Server Side Rendering, teknik rendering halaman di sisi server.
* **FCP:** First Contentful Paint, metrik kecepatan render visual pertama di layar.

---

### 2. Deskripsi Umum Sistem

**Perspektif Produk**
YO-MAP MVP adalah entitas produk baru dan independen yang dioptimalkan untuk perangkat seluler (*mobile-first*). Sistem beroperasi melalui peramban web modern tanpa perlu instalasi aplikasi native, memanfaatkan infrastruktur cloud (Vercel) dan basis data terkelola (Supabase).

**Fungsi-Fungsi Sistem**
Sistem memfasilitasi pengguna untuk mendaftarkan akun, mengerjakan soal tes psikometri secara asinkron, menerima hasil kalkulasi otomatis berupa 5 rekomendasi jurusan kuliah terbaik, dan memainkan misi permainan studi kasus untuk jurusan yang direkomendasikan.

**Karakteristik Pengguna**

| Peran | Karakteristik & Kebutuhan Utama |
| --- | --- |
| **Siswa SMA (Gen Z)** | Pengguna utama. *Mobile-first*, mudah bosan dengan teks panjang, menyukai gamifikasi, menuntut waktu muat yang sangat cepat dan interaksi visual instan. |
| **Guru BK** | Pengguna sekunder (peninjau). Memerlukan sajian data yang valid, terstruktur, dan objektif dari layar pengguna untuk keperluan diskusi bimbingan konseling tatap muka. |

---

### 3. Kebutuhan Khusus

**Kebutuhan Fungsional**

* **FR-1 (Autentikasi):** Sistem wajib menyediakan fitur registrasi dan login menggunakan email/password (Supabase Auth). Sistem wajib memaksa pengguna baru melengkapi profil (Nama, Sekolah, Gender) sebelum masuk ke *dashboard*.
* **FR-2 (Penyimpanan Asinkron):** Sistem wajib menyimpan setiap jawaban kuesioner ke tabel `user_answers` secara asinkron per interaksi. Kalkulasi skor kumulatif (RIASEC & DAT) wajib dieksekusi otomatis setelah tes selesai.
* **FR-3 (Algoritma Pencocokan):** Sistem wajib menjalankan komparasi jarak absolut antara skor tes pengguna dan standar data `major_profiles`.
* **FR-4 (Output Terbatas):** Sistem wajib membatasi dan menampilkan tepat 5 jurusan dengan nilai kecocokan tertinggi pada rute `/recommendation`.
* **FR-5 (Unlock System Game):** Sistem wajib mengunci akses misi lanjutan (status *disabled*) sebelum pengguna menyelesaikan misi level sebelumnya dengan skor yang melampaui `minimum_point`.
* **FR-6 (Mutasi Status Real-time):** Sistem wajib memperbarui status pengerjaan misi (`locked`, `unlocked`, `completed`) di tabel `game_progress` secara instan setiap ada perubahan capaian poin.

**Kebutuhan Antarmuka Pengguna (UI/UX)**
Antarmuka wajib dibangun secara ketat menggunakan komponen Shadcn UI yang dipetakan sebagai berikut:

| Kategori Antarmuka | Komponen Shadcn Wajib |
| --- | --- |
| Navigasi Global | `Sidebar`, `Sheet`, `Header` |
| Input Soal | `RadioGroup`, `Label` (hitbox minimal 44x44px) |
| Indikator Kemajuan | `Progress` (dengan animasi transisi mulus) |
| Kontainer Rekomendasi | `Card`, `CardHeader`, `CardTitle`, `CardContent` |
| Interceptor (Cegahan) | `AlertDialog` (mengaburkan latar belakang, *focus trap*) |
| Feedback Game | `Dialog` (modal ringkasan poin di tengah layar) |

**Kebutuhan Non-Fungsional (Kinerja & Keandalan)**

* **Performa:** Kecepatan muat halaman (Page Load Time) wajib di bawah 1.5 detik pada koneksi internet seluler standar (4G). FCP wajib di bawah 0.8 detik.
* **Akurasi:** Toleransi galat (error rate) pada fungsi algoritma perhitungan matematika bernilai 0%. Sistem wajib memiliki penanganan keamanan-*null* (*null-safety*).
* **Kualitas Kode:** Lolos *typechecking* TypeScript 100% pada mode *strict*. Penggunaan tipe data `any` dilarang.

---

### 4. Kasus Penggunaan (Use Case)

**Main Use Case (Skenario Utama)**

1. Siswa mendaftar dan memverifikasi akun di YO-MAP.
2. Siswa mengisi seluruh butir soal tes RIASEC dan DAT.
3. Siswa melihat dasbor hasil untuk menemukan 5 rekomendasi program studi terbaik beserta persentase kecocokannya.
4. Siswa memilih salah satu jurusan dan memulai "Career Skill Mission" (Simulasi Game).
5. Siswa menjawab studi kasus dengan benar, membuka gembok misi level berikutnya.

**Secondary Use Case**

1. Sistem menyimpan pergerakan progres (pilihan jawaban) setiap kali pengguna berpindah nomor urut kuesioner.
2. Sistem mengeksekusi perhitungan pembobotan nilai secara tertutup (di belakang layar) saat pengguna menekan tombol *submit* terakhir.

---

### 5. Kebutuhan Data

**Model Data Inti (Database Schema)**
Basis data menggunakan PostgreSQL via Supabase yang dijembatani oleh Prisma ORM.

* `User`: Menyimpan data identitas siswa.
* `Assessment`: Membungkus status satu siklus tes (Pending/Completed).
* `Question`: Menyimpan bank soal RIASEC dan DAT.
* `AnalysisResult`: Menyimpan format JSON kalkulasi skor akhir pengguna.
* `Major` & `MajorProfile`: Menyimpan metadata nama jurusan dan peta nilai acuan idealnya.
* `GameMission` & `GameQuestion`: Hierarki level permainan dan butir soal simulasi per jurusan.
* `GameProgress`: Tabel transaksional untuk melacak status buka/tutup gembok level pengguna.

---

### 6. Kebutuhan Lingkungan

**Kebutuhan Perangkat Keras**

* **Sisi Klien:** Perangkat ponsel pintar atau komputer destop standar dengan layar sentuh atau tetikus. Tidak ada spesifikasi khusus selain kemampuan menangkap jaringan minimal 4G/3G stabil.
* **Sisi Server:** Terkelola penuh via Cloud (Vercel untuk komputasi frontend/backend, Supabase untuk *database*).

**Kebutuhan Perangkat Lunak**

* **Sisi Klien:** Peramban web modern (Google Chrome, Safari, Mozilla Firefox) versi terbaru.
* **Sisi Server (Tech Stack):** * Framework: Next.js 14+ (App Router).
* Bahasa: TypeScript (Strict).
* Database: Supabase PostgreSQL.
* Manajemen State asinkron: TanStack Query (React Query).



---

### 7. Batasan-batasan dan Kebijakan

Untuk mengamankan peluncuran produk dalam jendela waktu 48 jam yang ketat, batasan sistem (*out of scope*) berikut ditetapkan:

* Tidak ada integrasi gerbang pembayaran (*Payment Gateway*). Sistem gratis sepenuhnya.
* Tidak ada pembuatan dasbor manajemen analitik yang kompleks (RBAC) untuk peran Guru BK.
* Tidak ada penerapan aset atau *rendering engine* 3D WebGL (seperti Three.js) untuk peta game. Interaksi hanya menggunakan UI Card-based.
* Tidak ada integrasi fitur Asisten Chatbot AI LLM.
