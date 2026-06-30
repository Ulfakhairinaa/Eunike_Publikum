export interface RiasecMapEntry {
  careers: string[]
  majors: string[]
}

export const RIASEC_MAP: Record<string, RiasecMapEntry> = {
  RIA: {
    careers: ["Arsitek", "Desainer Interior", "PWK", "Desainer Produk", "Insinyur Lingkungan", "Surveyor", "GIS Analyst", "Konsultan Tata Ruang", "Manajer Proyek Konstruksi"],
    majors: ["Arsitektur", "Arsitektur Interior", "PWK", "Desain Produk", "Teknik Lingkungan", "Geodesi"]
  },
  RIS: {
    careers: ["Dokter", "Dokter Gigi", "Perawat", "Bidan", "Apoteker", "Fisioterapis", "Ahli Gizi", "Epidemiolog", "Penyuluh Kesehatan"],
    majors: ["Kedokteran", "Kedokteran Gigi", "Keperawatan", "Kebidanan", "Farmasi", "Fisioterapi", "Gizi", "Kesmas"]
  },
  RIE: {
    careers: ["Insinyur Industri", "Software Developer", "Analis Sistem", "Insinyur Elektro/Mesin", "Analis Logistik", "Manajer Proyek/Operasional"],
    majors: ["Teknik Industri", "Teknik Informatika", "Sistem Informasi", "Teknik Elektro/Mesin", "Teknik Logistik"]
  },
  RIC: {
    careers: ["Ilmuwan Data", "Analis Data", "Programmer", "Aktuaris", "Statistisi", "Insinyur Fisika", "Konsultan TI"],
    majors: ["Teknik Informatika", "Ilmu Komputer", "Sistem Informasi", "Data Science", "Statistika", "Aktuaria"]
  },
  RAI: {
    careers: ["Arsitek", "Desainer Interior/Produk/Grafis", "Ilustrator", "Seniman", "Visual Merchandiser"],
    majors: ["Arsitektur", "Arsitektur Interior", "Desain Produk", "DKV", "Seni Rupa", "PWK"]
  },
  RAS: {
    careers: ["Guru", "Dosen", "Instruktur", "Pengembang Kurikulum", "Peneliti Pendidikan", "Laboran"],
    majors: ["Pendidikan Teknik", "Pendidikan Vokasi", "Pendidikan IPA/Biologi/Fisika"]
  },
  RAE: {
    careers: ["Manajer Proyek/Operasional", "Konsultan Bisnis", "Wirausahawan", "Analis Logistik", "Insinyur Industri"],
    majors: ["Teknik Industri", "Manajemen Rekayasa", "Bisnis Digital", "Arsitektur", "Logistik"]
  },
  RAC: {
    careers: ["Analis Sistem", "Konsultan TI", "Analis Bisnis", "Aktuaris", "Auditor Sistem", "Wirausahawan Digital"],
    majors: ["Sistem Informasi", "Teknik Industri", "Bisnis Digital", "Logistik", "Aktuaria"]
  },
  RSI: {
    careers: ["Dokter", "Perawat", "Fisioterapis", "Apoteker", "Psikolog", "Konselor", "Penyuluh Kesehatan"],
    majors: ["Kedokteran", "Keperawatan", "Fisioterapi", "Farmasi", "Psikologi", "Kesehatan Masyarakat"] // Note: Derived from linear context as specific Soshum wasn't fully listed, keeping close to source careers
  },
  RSA: {
    careers: ["Psikolog", "Guru", "Guru PAUD", "Guru BK", "Konselor", "Pengembang Kurikulum", "Trainer"],
    majors: ["Psikologi", "Pendidikan", "Bimbingan Konseling"] 
  },
  RSE: {
    careers: ["Ahli K3", "Manajer RS", "Psikolog", "Penyuluh Kesehatan", "Konsultan K3", "Auditor Keselamatan"],
    majors: ["K3", "Manajemen Rumah Sakit", "Kesehatan Masyarakat"]
  },
  RSC: {
    careers: ["Manajer RS", "Administrator Kesehatan", "Analis Sistem Info Kes", "ASN", "Analis Kebijakan Kesehatan"],
    majors: ["Manajemen Rumah Sakit", "Administrasi Kesehatan", "Sistem Informasi Kesehatan"]
  }
}

export type Difficulty = "Easy" | "Medium" | "Hard"
export type Field = "Saintek" | "Soshum"

export const FUN_FACTS: Record<Field, Record<Difficulty, string>> = {
  Saintek: {
    Easy: "Pemahaman konsep > hafalan, penggunaan AI sebagai asistensi, tidak SKS (Sistem Kebut Semalam), penasaran teknologi baru.",
    Medium: "Ketelitian angka, tugas individu vs diskusi, verifikasi AI, etika pengerjaan tugas (tidak copas).",
    Hard: "Mencari letak kesalahan tugas, kepuasan menemukan solusi soal sulit, kerja sama tim, keingintahuan mekanisme proses (kepo mekanis)."
  },
  Soshum: {
    Easy: "Fokus pada debat perspektif dan analisis masyarakat.",
    Medium: "Fokus pada debat perspektif dan analisis masyarakat.",
    Hard: "Fokus pada debat perspektif dan analisis masyarakat."
  }
}

export const MAJOR_DETAILS: Record<string, { deskripsi: string, prospek: string[], gaji: string }> = {
  "Teknik Informatika": {
    deskripsi: "Mempelajari prinsip komputasi, algoritma, struktur data, dan pengembangan perangkat lunak/sistem cerdas.",
    prospek: ["Software Engineer", "AI/ML Engineer", "Cloud Architect", "Data Scientist", "Cybersecurity Analyst"],
    gaji: "Rp 8.000.000 - Rp 25.000.000+"
  },
  "Sistem Informasi": {
    deskripsi: "Menggabungkan ilmu komputer dengan bisnis dan manajemen untuk merancang sistem yang memecahkan masalah organisasi.",
    prospek: ["IT Business Analyst", "System Analyst", "IT Project Manager", "ERP Consultant", "Product Manager"],
    gaji: "Rp 7.000.000 - Rp 20.000.000+"
  },
  "Arsitektur": {
    deskripsi: "Ilmu dan seni dalam merancang bangunan dan struktur fisik dengan mempertimbangkan estetika, fungsi, dan kekuatan.",
    prospek: ["Arsitek", "Desainer Interior", "Urban Planner", "Konsultan Bangunan"],
    gaji: "Rp 6.000.000 - Rp 18.000.000+"
  },
  "Desain Komunikasi Visual": {
    deskripsi: "Mempelajari cara menyampaikan pesan secara visual melalui media cetak dan digital.",
    prospek: ["Graphic Designer", "UI/UX Designer", "Art Director", "Animator", "Illustrator"],
    gaji: "Rp 5.000.000 - Rp 15.000.000+"
  },
  "Kedokteran": {
    deskripsi: "Ilmu yang mempelajari penyakit, cara pencegahan, pengobatan, dan perawatan kesehatan manusia.",
    prospek: ["Dokter Umum", "Dokter Spesialis", "Peneliti Medis", "Direktur Rumah Sakit"],
    gaji: "Rp 10.000.000 - Rp 40.000.000+"
  },
  "Manajemen": {
    deskripsi: "Mempelajari seni dalam mengelola bisnis, keuangan, pemasaran, dan sumber daya manusia.",
    prospek: ["Business Consultant", "Marketing Manager", "HR Manager", "Financial Analyst"],
    gaji: "Rp 6.000.000 - Rp 20.000.000+"
  },
  "Psikologi": {
    deskripsi: "Ilmu yang mempelajari perilaku dan proses mental manusia, termasuk emosi, pikiran, dan interaksi sosial.",
    prospek: ["Psikolog", "HR/Recruitment", "Konselor", "Peneliti Pasar"],
    gaji: "Rp 5.000.000 - Rp 15.000.000+"
  },
  "Ilmu Komunikasi": {
    deskripsi: "Mempelajari bagaimana pesan disampaikan, diterima, dan diproses oleh individu atau massa.",
    prospek: ["Public Relations", "Journalist", "Content Creator", "Broadcaster"],
    gaji: "Rp 5.000.000 - Rp 15.000.000+"
  }
}
