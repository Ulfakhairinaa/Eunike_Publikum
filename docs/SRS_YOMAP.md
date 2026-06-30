**Dokumen Software Design Document (SDD)**
**Nama Produk:** YO-MAP (Platform Inovasi Tes Minat Bakat Berbasis Game)
**Versi:** 1.0 (Minimum Viable Product - MVP)
**Target Siklus:** 48 Jam (Sprint Pengembang)

---

### 1. Pendahuluan (Introduction)

**1.1 Tujuan Dokumen**
Dokumen *Software Design Document* (SDD) ini disusun untuk memberikan panduan teknis yang komprehensif bagi tim pengembang (Frontend, Backend, dan Database Engineer) dalam membangun Minimum Viable Product (MVP) YO-MAP. Dokumen ini menerjemahkan spesifikasi dari dokumen *Software Requirements Specification* (SRS) menjadi rancangan arsitektur, struktur basis data, alur logika, dan desain komponen yang konkret guna memastikan target rilis dalam 48 jam tercapai tanpa cacat logika.

**1.2 Ruang Lingkup**
Cakupan perancangan ini meliputi arsitektur web aplikasi *mobile-first*, skema basis data relasional, desain antarmuka pengguna berbasis komponen Shadcn, algoritma pencocokan profil (*matching algorithm*), dan mesin state untuk gamifikasi (*game state engine*). Sistem eksternal di luar lingkup (seperti payment gateway atau AI Chatbot) tidak disertakan dalam rancangan ini.

**1.3 Definisi dan Singkatan**

* **Next.js App Router:** Paradigma *routing* terbaru dari React yang memisahkan *Server Components* dan *Client Components*.
* **JWT:** *JSON Web Token*, standar otentikasi untuk menjaga sesi pengguna.
* **RLS:** *Row Level Security*, mekanisme keamanan basis data di level baris pada PostgreSQL.
* **Prisma ORM:** *Object-Relational Mapping* untuk menjembatani kode TypeScript dengan PostgreSQL.

**1.4 Referensi**

* Dokumen SRS YO-MAP MVP v1.0.

---

### 2. Arsitektur Sistem (System Architecture)

**2.1 Pola Arsitektur Utama**
YO-MAP MVP menggunakan pola arsitektur **Serverless Monolith** menggunakan kerangka kerja Next.js. Seluruh lapisan antarmuka (Frontend) dan logika peladen (Backend) berada dalam satu basis kode (*monorepo*).

**2.2 Alur Sistem Tingkat Tinggi (High-Level Alur)**

1. **Client Layer:** Peramban pengguna mengeksekusi React Client Components.
2. **Network Layer:** Permintaan data dikelola oleh *TanStack Query* (untuk *caching* dan *fetching* asinkron) yang berkomunikasi dengan Next.js API Routes / Server Actions.
3. **Server Layer (Vercel Edge/Node):** Server Actions memvalidasi input (*Zod*) dan memanggil Prisma Client. Fungsi komputasi berat (algoritma pencocokan) dieksekusi di lapisan ini.
4. **Data Layer (Supabase):** Prisma ORM mengeksekusi kueri ke basis data PostgreSQL. Otorisasi divalidasi silang oleh Supabase Auth.

---

### 3. Rancangan Lingkungan & Infrastruktur

| Komponen | Teknologi Pilihan | Alasan Pemilihan (Konteks MVP 48 Jam) |
| --- | --- | --- |
| **Penyedia Komputasi/Hosting** | Vercel | Integrasi bawaan terbaik dengan Next.js, CI/CD otomatis (langsung dari GitHub), dan manajemen variabel lingkungan yang aman. |
| **Basis Data & Autentikasi** | Supabase (PostgreSQL) | Memiliki modul *Auth* bawaan yang tersinkronisasi dengan *database*, menghilangkan kebutuhan membangun sistem manajemen sesi dari nol. |
| **Kerangka Kerja Utama** | Next.js 14+ (App Router) | Menggunakan *React Server Components* (RSC) untuk mempercepat First Contentful Paint (FCP) di bawah 0.8 detik. |
| **Bahasa Pemrograman** | TypeScript (*Strict Mode*) | Memastikan keamanan tipe data 100%, meminimalisir *bug* saat *runtime*, dan mempercepat integrasi dengan Prisma. |
| **Manajemen Status API** | TanStack Query v5 | Menangani *retry*, *caching*, dan eksekusi asinkron di latar belakang (*background mutation*) untuk fitur simpan progres. |

---

### 4. Perancangan Data (Data Design)

**4.1 Entity Relationship Diagram (ERD) Deskriptif**
Sistem memiliki 7 entitas utama yang saling berelasi. Relasi dan *Foreign Key* (FK) wajib dikonfigurasi dengan mode `ON DELETE CASCADE` untuk entitas yang bergantung sepenuhnya pada entitas induk.

* **`User` (Induk):** Menyimpan profil dasar (`id`, `email`, `name`, `school`, `gender`).
* *Relasi:* 1-to-N ke `Assessment`, 1-to-N ke `GameProgress`.


* **`Assessment` (Sesi Tes):** Melacak status ujian (`id`, `user_id` [FK], `status`).
* *Relasi:* 1-to-1 ke `AnalysisResult`.


* **`Question` (Bank Soal Master):** Tabel statis berisi soal ujian (`id`, `type`, `category`, `question_text`, opsi, `correct_answer`).
* **`AnalysisResult` (Penyimpanan Output):** Menyimpan JSON hasil kalkulasi (`id`, `assessment_id` [FK], `riasec_scores`, `dat_scores`).
* **`Major` (Data Jurusan):** Tabel master jurusan (`id`, `name`, `description`).
* *Relasi:* 1-to-N ke `MajorProfile`, 1-to-N ke `GameMission`.


* **`MajorProfile` (Standar Kompetensi):** Profil ideal suatu jurusan (`id`, `major_id` [FK], `ideal_riasec`, `ideal_dat`).
* **`GameMission` & `GameQuestion`:** Hierarki level dan soal game (`level`, `min_point`, `correct_option`).
* **`GameProgress` (Status Transaksional Game):** Melacak buka/tutup level per user (`user_id` [FK], `mission_id` [FK], `status` (locked/unlocked/completed), `current_points`).

**4.2 Alur Manajemen Penyimpanan Data**

* **Penyimpanan Asinkron (FR-2):** Saat pengguna menjawab soal (klik *Radio Button*), fungsi `useMutation` dari TanStack Query akan memicu *update* lokal sementara ke state komponen (Zustand/Context) untuk kelancaran UI, lalu dalam jeda 500ms (*debounce*) mengirim beban data (payload) ke server untuk disimpan di tabel penampungan (atau langsung mengkalkulasi saat *submit* akhir).

---

### 5. Desain Komponen/Modul (Module Design)

**5.1 Modul Autentikasi & Profiling (FR-1)**

* **Logika Fungsional:** Menggunakan metode *Email/Password* Supabase.
* **Aturan Bisnis:** Middleware Next.js (`middleware.ts`) akan menyadap setiap *request*. Jika *path* adalah `/dashboard` namun atribut `name` atau `school` di tabel `User` masih *null*, *request* dialihkan (HTTP 307 Redirect) ke rute `/profile-setup`.

**5.2 Modul Evaluasi (RIASEC & DAT) (FR-2)**

* **Logika Fungsional:** Data `Question` ditarik secara massal (batch) per kategori saat halaman dimuat (menggunakan *Server Components*).
* **Aturan Bisnis:** Klien merender soal menggunakan komponen *Shadcn RadioGroup*. State jawaban dijaga agar tidak hilang saat pengguna me-*refresh* halaman (disimpan via *localStorage* dan di-sinkronisasi asinkron ke server).

**5.3 Modul Algoritma Pencocokan (Recommendation Engine) (FR-3 & FR-4)**

* **Logika Komputasi:** Sistem menggunakan algoritma metrik jarak absolut (*Absolute Distance/Manhattan Distance*) terbobot.
* **Formulasi Matematika:**
Mendefinisikan vektor profil pengguna $U$ dan vektor profil ideal jurusan $M$. Total nilai ketidakcocokan (Delta) dihitung dengan:
$$Delta = \sum_{k=1}^{6} \left| U_{R, k} - M_{R, k} \right| + \sum_{j=1}^{3} \left| U_{D, j} - M_{D, j} \right|$$


Dimana:
$U_{R, k}$ dan $M_{R, k}$ merepresentasikan skor 6 dimensi RIASEC.
$U_{D, j}$ dan $M_{D, j}$ merepresentasikan skor 3 dimensi DAT.
* **Aturan Bisnis:** Hasil $Delta$ dari seluruh baris `MajorProfile` akan dimasukkan ke dalam susunan data (*array*), lalu diurutkan (*sort*) secara ascending (nilai terkecil = paling cocok). Array dipotong (*slice*) hanya untuk mengambil *top 5*. Array ini kemudian dibalik menjadi persentase kecocokan (misal: Delta terkecil = 99% Match).

**5.4 Modul Mesin Permainan Simulasi (Game Engine) (FR-5 & FR-6)**

* **Logika Fungsional:** Saat rute `/simulation/[major_id]` dibuka, server menarik data dari `GameMission` yang berelasi dengan jurusan, di-JOIN dengan `GameProgress` milik *user*.
* **Aturan Bisnis (Sistem Gerbang/Unlock):**
* Sistem mengevaluasi: `IF prevMission.score >= prevMission.min_point THEN nextMission.status = 'unlocked' ELSE nextMission.status = 'locked'`.
* Jika pengguna memanipulasi URL untuk masuk ke rute misi berstatus *locked*, sistem menolak (HTTP 403 Forbidden).



---

### 6. Antarmuka Pengguna (User Interface)

**6.1 Peta Situs & Alur Navigasi (Sitemap & Flow)**

1. `/` -> *Landing Page* (Penjelasan fitur).
2. `/auth/login` & `/auth/register` -> Gerbang akses.
3. `/profile-setup` -> Form pelengkapan data.
4. `/dashboard` -> *Hub* Utama. Menampilkan `Card` status tes (Warna Kuning: *Pending*, Hijau: *Completed*).
5. `/assessment/riasec` & `/assessment/dat` -> Antarmuka uji. Menggunakan `Progress` bar mulus di bagian atas. Tombol submit dicegat oleh `AlertDialog` konfirmasi.
6. `/recommendation` -> Menampilkan peringkat 5 jurusan dengan `Card`.
7. `/simulation/[major_id]` -> Daftar level misi.
8. `/simulation/play/[mission_id]` -> UI permainan berbentuk kartu tebak pilihan. Diakhiri dengan `Dialog` pop-up keberhasilan/kegagalan.

**6.2 Standar Komponen UI (Shadcn)**
Sistem mewajibkan layout *Mobile-First*. `Sidebar` di sebelah kiri pada layar > 1024px, berubah menjadi *hamburger menu* memanggil komponen `Sheet` pada layar < 1024px. Area sentuh pada soal (komponen `Label`) wajib disetel pada dimensi minimal 44x44px (`min-h-[44px] min-w-[44px]`).

---

### 7. Keamanan & Penanganan Kesalahan (Security & Error Handling)

**7.1 Autentikasi dan Otorisasi**

* *Session Management:* Menggunakan *HTTP-only Cookies* yang diinjeksi oleh Supabase Auth.
* *Otorisasi Basis Data:* Kebijakan *Row Level Security* (RLS) pada PostgreSQL. Contoh kebijakan (Policy): `CREATE POLICY "User can view own progress" ON "GameProgress" FOR SELECT USING (auth.uid() = user_id);` Ini menjamin data analitik siswa A tidak akan bocor ke siswa B meskipun terjadi eksploitasi API.

**7.2 Validasi dan Penanganan Kesalahan (Error Handling)**

* **Frontend Validation:** Seluruh *input form* dilindungi oleh skema validasi `Zod` yang disuntikkan ke `React Hook Form`. Kesalahan format akan memicu teks peringatan merah di bawah *input* secara instan.
* **Backend Validation:** API wajib memvalidasi ulang payload menggunakan `Zod` (*Double Validation*).
* **UI Error State:** Implementasi komponen `error.tsx` (React Error Boundaries) di Next.js untuk mencegah aplikasi (*white screen of death*). Jika algoritma gagal (*error 500*), pengguna melihat UI ramah berbunyi "Terjadi kegagalan perhitungan, silakan muat ulang".
* **Penanganan *Null* (Null-Safety):** Variabel hasil database wajib diakses dengan operator rentang opsional (`?.`) atau penanganan kondisi *fallback* (`?? 'Data tidak tersedia'`).

---

### 8. Asumsi & Batasan (Assumptions & Constraints)

**8.1 Asumsi Teknis**

* Diasumsikan *seed data* (bank soal, kunci jawaban DAT, profil ideal RIASEC/DAT jurusan) sudah disiapkan sepenuhnya oleh Tim Ahli/Produk dalam format JSON siap muat (`seed.ts`), sehingga tim pengembang tidak membuang jam kerja untuk meriset soal.
* Koneksi peramban pengguna ke server Supabase/Vercel dianggap cukup stabil untuk pengiriman beban *payload* kecil (<10kb) per iterasi asinkron.

**8.2 Batasan (Constraints) & Risiko**

* **Waktu Eksekusi 48 Jam:** Tidak ada ruang untuk penulisan *End-to-End Testing* (E2E) kompleks menggunakan Playwright/Cypress. Pengujian akan bergantung murni pada *TypeScript Strict Mode* (kompilasi statis) dan *Manual Testing*.
* **Batas Memori Serverless:** Fungsi komputasi pencocokan rekomendasi (FR-3) dijalankan pada Vercel Serverless Function yang memiliki batas waktu (*timeout*) 10 detik (untuk paket Hobby). Algoritma wajib dioptimalkan (kompleksitas Big O minimal $O(N)$ di mana N adalah jumlah jurusan) agar tidak terkena *timeout*.
* **Absennya State Eksternal:** Permainan *Game Mission* murni berbasis pertukaran poin matematika di sisi server/klien, tanpa *WebSocket* atau animasi grafis kompleks (WebGL) demi mempertahankan kinerja *mobile-first* dan kecepatan pemuatan halaman di bawah 1.5 detik.