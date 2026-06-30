# YO MAP - QUICK START GUIDE
**Deadline: BESOK | Status: Ready to Execute**

---

## 📋 Files yang Sudah Dibuat

1. **YO-MAP_HANDOFF_DOCUMENT.md** - Konteks lengkap project
2. **YO-MAP_PROMPT_PHASE1.md** - Foundation setup
3. **YO-MAP_PROMPT_PHASE2-4.md** - Auth, Quiz, Rekomendasi

---

## 🚀 Cara Execute ke Antigravity

### STEP 1: Setup Figma MCP (di Antigravity)

Pastikan file `~/.gemini/config/mcp_config.json` sudah ada dan dikonfigurasi:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_FIGMA_API_KEY_HERE",
        "--stdio"
      ]
    }
  }
}
```

**Konfirmasi di Antigravity:** "Cek apakah Figma MCP sudah terkonfigurasi. Kalau belum, buat file config seperti di atas."

---

### STEP 2: Copy Handoff Document ke Antigravity

**Kirim ke Antigravity sebagai context/background:**

```
Baca dokumen ini sebagai background/konteks untuk project YO MAP:

[COPY ISI YO-MAP_HANDOFF_DOCUMENT.md]

Project ini adalah web app full-stack (Next.js + Supabase + Prisma) dengan 
deadline BESOK. Prioritaskan Phase 1-4 (Core features), skip optional kalau 
ketat waktu.
```

---

### STEP 3: Execute PHASE 1 (Foundation)

**Kirim prompt ke Antigravity:**

```
[COPY ISI YO-MAP_PROMPT_PHASE1.md]

Lakukan semua tugas PHASE 1 sesuai urutan yang diberikan.
Jangan lanjut ke PHASE 2 sebelum PHASE 1 fully working.

Lapor hasil:
- Yang sudah dibuat (list file)
- Error yang ditemukan & solusinya
- Test result (bisa buka http://localhost:3000 ?)
```

**DURASI: 2-3 jam**

---

### STEP 4: Verify PHASE 1

**Sebelum lanjut ke PHASE 2, pastikan:**

```
- [ ] npm run dev jalan tanpa error
- [ ] Landing page muncul di http://localhost:3000
- [ ] Tailwind CSS styling bekerja (ada background gradient)
- [ ] Prisma schema berhasil di-migrate ke Supabase
- [ ] .env.local sudah diisi dengan Supabase credentials
- [ ] Tidak ada error di console
```

Kalau ada masalah, debug dengan Antigravity sebelum lanjut.

---

### STEP 5: Execute PHASE 2 (Auth Pages)

Setelah PHASE 1 verified, kirim:

```
[COPY ISI YO-MAP_PROMPT_PHASE2-4.md - PHASE 2 SECTION SAJA]

Lakukan PHASE 2: Buat Auth Context, Login Page, Register Page.
Setelah selesai, test:
- Register akun baru
- Login dengan akun tersebut
- Validasi error messages
- Cek redirect ke dashboard setelah login
```

**DURASI: 1-2 jam**

---

### STEP 6: Execute PHASE 3 (Quiz Core)

```
[COPY ISI YO-MAP_PROMPT_PHASE2-4.md - PHASE 3 SECTION SAJA]

Lakukan PHASE 3: Setup database sample data, API routes, Dashboard, 
Quiz Detail page.

Test:
- Dashboard muncul dengan list quiz
- Klik quiz → pertanyaan muncul
- Jawab semua pertanyaan → submit → lihat hasil
```

**DURASI: 2-3 jam**

---

### STEP 7: Execute PHASE 4 (Hasil & Rekomendasi)

```
[COPY ISI YO-MAP_PROMPT_PHASE2-4.md - PHASE 4 SECTION SAJA]

Lakukan PHASE 4: Hasil Analisis page, Rekomendasi Jurusan page, Navbar.

Test:
- Setelah submit quiz, hasil analisis tampil
- Klik "Lihat Rekomendasi Jurusan" → halaman rekomendasi
- Navbar tampil di semua halaman
- Logout bekerja
```

**DURASI: 1-2 jam**

---

## ⏱️ Timeline Keseluruhan

```
PHASE 1: 2-3 jam (Foundation setup)
PHASE 2: 1-2 jam (Auth)
PHASE 3: 2-3 jam (Quiz core)
PHASE 4: 1-2 jam (Hasil & Rekomendasi)
─────────────────
TOTAL: 7-10 jam
```

**Kalau mulai sekarang dan non-stop, bisa selesai dalam 8-10 jam untuk full MVP.**

---

## ⚠️ CRITICAL NOTES

1. **Jangan skip PHASE 1** - Ini fondasi semua
2. **Supabase credentials wajib** - Kalau tidak punya, daftar di https://supabase.com (gratis)
3. **Database migration wajib berhasil** - Kalau error, jangan lanjut
4. **Test setiap phase** sebelum ke phase berikutnya
5. **Kalau waktu tebang**, skip PHASE 5 (optional pages) dan landing page polish
6. **Use Shadcn UI** untuk component library - jangan custom styling dari nol

---

## 📊 Quick Feature Checklist

### CORE FEATURES (Wajib selesai):
- [x] Database schema + Supabase setup
- [x] Auth (Register + Login)
- [x] Dashboard (list quiz)
- [x] Quiz interface (jawab pertanyaan)
- [x] Hasil analisis (skor + interpretasi)
- [x] Rekomendasi jurusan (based on result)

### OPTIONAL (kalau ada waktu):
- [ ] Landing page (bukan main page)
- [ ] Detail jurusan page
- [ ] Prospek karir page
- [ ] Modul soft skill
- [ ] Leaderboard/poin quiz
- [ ] Email verification
- [ ] Social login

---

## 🔗 Resources

- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js 14 Docs**: https://nextjs.org/docs
- **Shadcn UI**: https://ui.shadcn.com
- **TanStack Query**: https://tanstack.com/query/latest

---

## 📌 Jika Ada Masalah

### Error saat npm install
```bash
npm install
# Kalau masih error, coba:
rm -rf node_modules package-lock.json
npm install
```

### Prisma migration error
```bash
# Cek DATABASE_URL di .env.local
# Kalau benar tapi masih error, reset:
npx prisma db push --force-reset
```

### Supabase connection error
- Verifikasi NEXT_PUBLIC_SUPABASE_URL
- Verifikasi SUPABASE_ANON_KEY
- Check di Supabase dashboard → Settings → API

### Port 3000 sudah dipakai
```bash
npm run dev -- -p 3001
# Buka http://localhost:3001
```

---

## ✅ CHECKLIST SEBELUM SUBMIT

Sebelum deadline, pastikan:

- [ ] Semua 4 phase berhasil dikerjakan
- [ ] Landing page / login page bisa dibuka
- [ ] Bisa register akun baru
- [ ] Bisa login dengan akun
- [ ] Bisa masuk ke dashboard
- [ ] Bisa membuka quiz dan jawab semua pertanyaan
- [ ] Hasil analisis tampil setelah submit
- [ ] Bisa lihat rekomendasi jurusan
- [ ] Logout bekerja
- [ ] Tidak ada error di console browser
- [ ] Database sudah terbuat di Supabase (visible di dashboard)

---

## 🚀 Siap Dimulai?

Kirim **YO-MAP_HANDOFF_DOCUMENT.md** dulu ke Antigravity sebagai context.

Setelah itu, kirim **YO-MAP_PROMPT_PHASE1.md** untuk mulai eksekusi.

**Let's go! 💪**
