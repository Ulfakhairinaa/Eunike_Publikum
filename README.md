# YOMAP - Career Platform (Backend/Fullstack Repository)

Proyek ini adalah repositori utama untuk aplikasi **YOMAP (Career Platform)**, yang dibangun menggunakan **Next.js 15 (App Router)**, **Prisma ORM**, dan **Supabase**.

Dokumen ini berisi panduan khusus untuk **Frontend Developer** agar dapat melakukan *clone*, menjalankan aplikasi di lokal, dan mulai mengintegrasikan desain UI/UX (Figma).

---

## 🛠️ Persyaratan Sistem (Prerequisites)

Sebelum mulai, pastikan komputer Anda sudah terinstal perangkat lunak berikut:
1. **Node.js** (Minimal versi v18.17 atau yang terbaru).
2. **Git** (Untuk melakukan *clone* repositori).
3. Akses ke kredensial Supabase (silakan minta ke tim Backend / *Project Manager*).

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi (Langkah demi Langkah)

### 1. Clone Repositori
Buka terminal Anda dan jalankan perintah berikut untuk mengunduh kode ke komputer lokal:
```bash
git clone https://github.com/Ulfakhairinaa/Eunike_Publikum.git
cd Eunike_Publikum
```

### 2. Instalasi Dependencies
Setelah masuk ke folder proyek, instal seluruh paket yang dibutuhkan (sangat disarankan menggunakan `npm` standar):
```bash
npm install
```

### 3. Konfigurasi Environment Variables (.env)
Aplikasi ini terhubung dengan *database* Supabase. Anda **wajib** membuat file `.env` dan `.env.local` (jika diperlukan) di folder *root* proyek (sejajar dengan file `package.json`).

Buat file bernama `.env` dan masukkan variabel berikut:
```env
# URL koneksi Database PostgreSQL (via Supabase)
DATABASE_URL="<MINTA_KE_TIM_BACKEND>"
DIRECT_URL="<MINTA_KE_TIM_BACKEND>"

# Konfigurasi Autentikasi Supabase
NEXT_PUBLIC_SUPABASE_URL="<MINTA_KE_TIM_BACKEND>"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<MINTA_KE_TIM_BACKEND>"
```
*(Catatan: Mintalah keempat nilai kredensial di atas kepada tim Backend / Project Manager Anda, lalu tempelkan menggantikan `<MINTA_KE_TIM_BACKEND>`.)*

### 4. Sinkronisasi Database (Prisma)
Setelah file `.env` siap, Anda perlu membuat (*generate*) Prisma Client agar TypeScript mengenali skema database terbaru, lalu memastikan struktur tabel di database sudah sinkron:

1. Buat Prisma Client (wajib setiap kali ada perubahan skema atau setelah clone baru):
   ```bash
   npx prisma generate
   ```
2. Sinkronisasikan skema ke database (Hati-hati: pastikan database yang digunakan adalah database development):
   ```bash
   npx prisma db push
   ```

### 5. Memasukkan Data Awal (Seeding)
Agar aplikasi dapat berjalan dengan data yang relevan (seperti pertanyaan kuis RIASEC dan misi game), Anda wajib menjalankan perintah *seeding* berikut secara berurutan:

1. Menjalankan *seed* dasar (untuk memasukkan Role, Kategori RIASEC, dan Bank Soal Kuis awal):
   ```bash
   npm run seed
   ```
2. Menjalankan *seed* khusus untuk Misi Game Interaktif (memasukkan soal-soal jurusan SAINTEK & SOSHUM beserta Fun Fact-nya):
   ```bash
   npm run seed:game
   ```
*(Catatan: Pastikan muncul tulisan "Seeding selesai!" atau "Success" tanpa error warna merah di terminal pada kedua perintah di atas).*

### 6. Jalankan Server Development
Sekarang aplikasi dan database sudah siap! Gunakan perintah berikut untuk menjalankan web:
```bash
npm run dev
```
Buka browser Anda dan akses: **[http://localhost:3000](http://localhost:3000)**. 
Jika halaman utama YOMAP muncul, selamat, aplikasi sudah berjalan sempurna di lokal Anda! 🎉

---

## 🎨 Panduan Khusus Frontend Developer

Sebagai Frontend Developer, fokus utama Anda adalah mengintegrasikan desain *pixel-perfect* dari Figma ke dalam *codebase* ini.

Berikut adalah hal-hal penting yang perlu Anda perhatikan:

### 1. Struktur Folder (Next.js App Router)
- **`src/app/`**: Folder ini berisi semua *routing* halaman.
  - Halaman publik ada di *root* `src/app/` (seperti `page.tsx` untuk Beranda).
  - Halaman terkait autentikasi (Login/Register) ada di `src/app/auth/`.
  - Halaman yang butuh *login* (terproteksi) ada di `src/app/(protected)/`.
- **`src/components/`**: Tempat Anda menaruh atau memodifikasi komponen UI yang bisa dipakai ulang (*reusable*).
- **`src/lib/`**: Kumpulan fungsi utilitas, konstanta, *server actions*, dan *database client*.

### 2. Styling (Tailwind CSS)
Aplikasi ini sepenuhnya menggunakan **Tailwind CSS v4** (dan `shadcn/ui` untuk beberapa komponen dasar). 
- Konfigurasi tema global dan warna utama (seperti warna `primary`, `background`, dsb) diatur di dalam file **`src/app/globals.css`**.
- Jika Anda ingin mengubah warna global agar sesuai Figma, ubahlah variabel CSS di file `globals.css` tersebut.

### 3. Batasan Mengubah Kode (Aturan Penting!)
Agar logika *backend*, autentikasi, dan perhitungan kuis yang sudah dibuat **TIDAK RUSAK**, mohon patuhi aturan berikut:
- **JANGAN MENGHAPUS** atau mengubah nama properti (fungsi, state, prop) yang berhubungan dengan pengambilan data (*fetching*), pengiriman data (*mutations/Server Actions*), dan perhitungan Prisma.
- Anda **SANGAT DIBEBASKAN** untuk merombak total tag HTML, class Tailwind (`className`), struktur DOM, animasi, hingga tata letak layar (*layouting*) pada file `page.tsx` atau `layout.tsx`.
- Jika sebuah komponen memiliki logika React rumit (*hooks, transitions*) seperti pada `src/components/quiz/quiz-client.tsx`, Anda cukup memoles `className` dan tag HTML-nya saja tanpa mengubah fungsi utamanya.
- Aplikasi ini sudah di-*setup* menggunakan paradigma arsitektur campuran *Server Components* dan *Client Components* bawaan Next.js.

Selamat bekerja dan selamat mempercantik YOMAP! 🚀
