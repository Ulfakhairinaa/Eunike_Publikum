// ─── Career Metadata ──────────────────────────────────────────────────────────
// Metadata statis per karier: dipakai di halaman Prospek Karier & Detail Jurusan

export type CareerMeta = {
  description: string
  salaryRange: string
  salaryMin: number   // juta/bulan, untuk sorting
  salaryMax: number
  emoji: string
  tags: string[]
  demand: 'Sangat Tinggi' | 'Tinggi' | 'Sedang'
}

export const CAREER_META: Record<string, CareerMeta> = {
  // ── Teknologi & Digital ──────────────────────────────────────────────────
  'Pengembang Perangkat Lunak': {
    description: 'Merancang, mengembangkan, dan memelihara aplikasi serta sistem perangkat lunak yang digunakan di berbagai industri.',
    salaryRange: '8 - 30 jt/bln', salaryMin: 8, salaryMax: 30,
    emoji: '👨‍💻', tags: ['Full Stack', 'Backend', 'Agile'], demand: 'Sangat Tinggi'
  },
  'Ilmuwan Data': {
    description: 'Menganalisis dan menginterpretasikan data kompleks untuk menghasilkan insight strategis berbasis machine learning.',
    salaryRange: '12 - 40 jt/bln', salaryMin: 12, salaryMax: 40,
    emoji: '📊', tags: ['Machine Learning', 'Python', 'Big Data'], demand: 'Sangat Tinggi'
  },
  'Analis Data': {
    description: 'Memproses dan menganalisis data bisnis untuk mendukung pengambilan keputusan berbasis bukti.',
    salaryRange: '7 - 20 jt/bln', salaryMin: 7, salaryMax: 20,
    emoji: '📈', tags: ['SQL', 'Excel', 'Tableau'], demand: 'Sangat Tinggi'
  },
  'Analis Sistem': {
    description: 'Menganalisis kebutuhan bisnis dan merancang solusi sistem informasi yang efektif dan efisien.',
    salaryRange: '7 - 18 jt/bln', salaryMin: 7, salaryMax: 18,
    emoji: '🔍', tags: ['System Design', 'Business Analysis', 'SDLC'], demand: 'Tinggi'
  },
  'Programmer': {
    description: 'Menulis, menguji, dan memelihara kode program untuk berbagai aplikasi dan sistem komputer.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '💻', tags: ['Coding', 'Debugging', 'OOP'], demand: 'Sangat Tinggi'
  },
  'UI/UX Designer': {
    description: 'Merancang antarmuka dan pengalaman pengguna yang intuitif, estetis, dan efektif untuk produk digital.',
    salaryRange: '7 - 22 jt/bln', salaryMin: 7, salaryMax: 22,
    emoji: '🎨', tags: ['Figma', 'Prototyping', 'User Research'], demand: 'Sangat Tinggi'
  },
  'Konsultan Teknologi Informasi': {
    description: 'Memberikan saran strategis tentang penggunaan teknologi untuk meningkatkan efisiensi dan efektivitas bisnis.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '🖥️', tags: ['IT Strategy', 'ERP', 'Cloud'], demand: 'Tinggi'
  },
  'Analis Kecerdasan Bisnis': {
    description: 'Menganalisis data bisnis dan membuat dashboard untuk mendukung keputusan strategis perusahaan.',
    salaryRange: '8 - 22 jt/bln', salaryMin: 8, salaryMax: 22,
    emoji: '📉', tags: ['Power BI', 'Data Warehouse', 'Analytics'], demand: 'Tinggi'
  },
  'Business Intelligence Analyst': {
    description: 'Mengolah data operasional menjadi laporan dan visualisasi yang mendukung keputusan strategis bisnis.',
    salaryRange: '8 - 22 jt/bln', salaryMin: 8, salaryMax: 22,
    emoji: '📉', tags: ['BI Tools', 'SQL', 'Data Modeling'], demand: 'Tinggi'
  },
  'Product Manager': {
    description: 'Memimpin pengembangan produk dari ideasi hingga peluncuran, menyelaraskan kebutuhan bisnis dan teknis.',
    salaryRange: '12 - 35 jt/bln', salaryMin: 12, salaryMax: 35,
    emoji: '🚀', tags: ['Roadmap', 'Agile', 'OKR'], demand: 'Sangat Tinggi'
  },
  'Wirausahawan Digital': {
    description: 'Membangun dan mengembangkan bisnis berbasis teknologi digital dengan model bisnis inovatif.',
    salaryRange: '10 - 50+ jt/bln', salaryMin: 10, salaryMax: 50,
    emoji: '💡', tags: ['Startup', 'E-Commerce', 'Growth Hacking'], demand: 'Tinggi'
  },
  'Spesialis Pemasaran Digital': {
    description: 'Merancang dan menjalankan kampanye pemasaran digital untuk meningkatkan brand awareness dan konversi.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '📱', tags: ['SEO', 'Social Media', 'Google Ads'], demand: 'Sangat Tinggi'
  },
  'Content Strategist': {
    description: 'Merencanakan dan mengelola strategi konten untuk membangun kehadiran digital yang kuat dan konsisten.',
    salaryRange: '6 - 15 jt/bln', salaryMin: 6, salaryMax: 15,
    emoji: '✍️', tags: ['Content Plan', 'SEO', 'Brand Voice'], demand: 'Tinggi'
  },
  'Auditor Sistem': {
    description: 'Menilai keamanan, keandalan, dan efektivitas sistem informasi dalam organisasi.',
    salaryRange: '7 - 20 jt/bln', salaryMin: 7, salaryMax: 20,
    emoji: '🔒', tags: ['IT Audit', 'CISA', 'Risk Management'], demand: 'Tinggi'
  },
  'Pengembang Multimedia': {
    description: 'Membuat konten multimedia interaktif termasuk animasi, video, dan aplikasi untuk berbagai platform.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🎬', tags: ['After Effects', 'Unity', 'Animation'], demand: 'Tinggi'
  },
  // ── Teknik & Rekayasa ────────────────────────────────────────────────────
  'Insinyur Industri': {
    description: 'Mengoptimalkan sistem produksi, proses, dan operasional untuk meningkatkan efisiensi dan kualitas.',
    salaryRange: '7 - 22 jt/bln', salaryMin: 7, salaryMax: 22,
    emoji: '⚙️', tags: ['Lean', 'Six Sigma', 'Process Optimization'], demand: 'Tinggi'
  },
  'Insinyur Elektro': {
    description: 'Merancang dan mengembangkan sistem kelistrikan, elektronika, dan telekomunikasi.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '⚡', tags: ['Power Systems', 'Embedded', 'IoT'], demand: 'Tinggi'
  },
  'Insinyur Mesin': {
    description: 'Merancang, mengembangkan, dan memelihara mesin serta sistem mekanikal.',
    salaryRange: '7 - 22 jt/bln', salaryMin: 7, salaryMax: 22,
    emoji: '🔧', tags: ['CAD', 'Manufacturing', 'Simulation'], demand: 'Tinggi'
  },
  'Insinyur Lingkungan': {
    description: 'Merancang solusi rekayasa untuk mengatasi masalah lingkungan seperti pengolahan air dan limbah.',
    salaryRange: '7 - 18 jt/bln', salaryMin: 7, salaryMax: 18,
    emoji: '🌿', tags: ['AMDAL', 'Water Treatment', 'Waste Management'], demand: 'Sedang'
  },
  'Insinyur Fisika': {
    description: 'Menerapkan prinsip fisika untuk memecahkan masalah rekayasa dalam bidang energi dan instrumentasi.',
    salaryRange: '8 - 22 jt/bln', salaryMin: 8, salaryMax: 22,
    emoji: '⚗️', tags: ['Instrumentasi', 'Kontrol Proses', 'Energi'], demand: 'Sedang'
  },
  'Analis Logistik': {
    description: 'Menganalisis dan mengoptimalkan rantai pasokan, distribusi, dan pengelolaan inventori.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '📦', tags: ['Supply Chain', 'SAP', 'Forecasting'], demand: 'Tinggi'
  },
  'Supply Chain Manager': {
    description: 'Mengelola dan mengkoordinasikan seluruh rantai pasok mulai dari pemasok hingga konsumen akhir.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '🚢', tags: ['Procurement', 'Logistics', 'Vendor Management'], demand: 'Tinggi'
  },
  'Spesialis Rantai Pasok': {
    description: 'Mengelola dan mengoptimalkan rantai pasok untuk memastikan kelancaran aliran produk.',
    salaryRange: '7 - 18 jt/bln', salaryMin: 7, salaryMax: 18,
    emoji: '🚚', tags: ['Logistics', 'ERP', 'Inventory'], demand: 'Tinggi'
  },
  'Manajer Proyek': {
    description: 'Memimpin dan mengkoordinasikan tim untuk menyelesaikan proyek tepat waktu, sesuai anggaran, dan scope.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '📋', tags: ['Agile', 'Scrum', 'PMP'], demand: 'Sangat Tinggi'
  },
  'Manajer Operasional': {
    description: 'Mengelola operasional sehari-hari bisnis untuk memastikan efisiensi dan efektivitas.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '📊', tags: ['Operations', 'KPI', 'Process Improvement'], demand: 'Tinggi'
  },
  // ── Desain & Arsitektur ──────────────────────────────────────────────────
  'Arsitek': {
    description: 'Merancang bangunan dan ruang yang fungsional, estetis, aman, dan berkelanjutan.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '🏛️', tags: ['AutoCAD', 'BIM', 'SketchUp'], demand: 'Sedang'
  },
  'Arsitek Lanskap': {
    description: 'Merancang ruang luar dan kawasan hijau yang harmonis dengan alam dan kebutuhan manusia.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🌳', tags: ['Lanskap', 'Taman', 'Urban Green'], demand: 'Sedang'
  },
  'Desainer Interior': {
    description: 'Merancang ruang interior yang estetis, fungsional, dan sesuai kebutuhan pengguna.',
    salaryRange: '5 - 18 jt/bln', salaryMin: 5, salaryMax: 18,
    emoji: '🛋️', tags: ['AutoCAD', '3Ds Max', 'Staging'], demand: 'Sedang'
  },
  'Desainer Produk': {
    description: 'Merancang produk yang fungsional, ergonomis, dan menarik secara estetis untuk produksi massal.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '🎨', tags: ['CAD', 'Prototyping', 'User Research'], demand: 'Tinggi'
  },
  'Desainer Grafis': {
    description: 'Menciptakan solusi visual yang komunikatif dan menarik untuk berbagai kebutuhan media.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🖌️', tags: ['Adobe CC', 'Illustrator', 'Branding'], demand: 'Tinggi'
  },
  'Perencana Wilayah dan Kota': {
    description: 'Merancang dan merencanakan penggunaan lahan perkotaan dan perdesaan secara berkelanjutan.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🗺️', tags: ['GIS', 'Urban Planning', 'Tata Ruang'], demand: 'Sedang'
  },
  'Surveyor': {
    description: 'Mengukur dan memetakan lahan, bangunan, dan wilayah untuk berbagai keperluan teknis.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '📐', tags: ['GPS', 'GIS', 'Pengukuran'], demand: 'Sedang'
  },
  'Analis Sistem Informasi Geografis (SIG)': {
    description: 'Menganalisis data geospasial untuk mendukung perencanaan wilayah dan pengambilan keputusan.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '🛰️', tags: ['GIS', 'Remote Sensing', 'ArcGIS'], demand: 'Sedang'
  },
  'Creative Director': {
    description: 'Memimpin tim kreatif dalam mengembangkan konsep visual dan kampanye komunikasi yang inovatif.',
    salaryRange: '15 - 40 jt/bln', salaryMin: 15, salaryMax: 40,
    emoji: '🎭', tags: ['Creative Leadership', 'Branding', 'Concept'], demand: 'Tinggi'
  },
  'Ilustrator': {
    description: 'Menciptakan ilustrasi orisinal untuk buku, media, produk, dan berbagai kebutuhan visual lainnya.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '✏️', tags: ['Digital Art', 'Procreate', 'Adobe Illustrator'], demand: 'Sedang'
  },
  'Animator': {
    description: 'Membuat animasi 2D/3D untuk film, game, iklan, dan konten digital lainnya.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '🎬', tags: ['Maya', 'Blender', 'After Effects'], demand: 'Tinggi'
  },
  'Fotografer': {
    description: 'Menangkap gambar berkualitas tinggi untuk komersial, jurnalistik, atau keperluan artistik.',
    salaryRange: '5 - 20 jt/bln', salaryMin: 5, salaryMax: 20,
    emoji: '📸', tags: ['Photography', 'Lightroom', 'Studio'], demand: 'Sedang'
  },
  'Sutradara': {
    description: 'Memimpin seluruh proses produksi film atau video dari pra-produksi hingga pasca-produksi.',
    salaryRange: '8 - 40 jt/bln', salaryMin: 8, salaryMax: 40,
    emoji: '🎥', tags: ['Direction', 'Storytelling', 'Production'], demand: 'Sedang'
  },
  'Konsultan Desain': {
    description: 'Memberikan saran profesional dalam bidang desain untuk klien korporat maupun individu.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '💡', tags: ['Design Thinking', 'Consulting', 'Brand'], demand: 'Sedang'
  },
  'Manajer Proyek Konstruksi': {
    description: 'Mengelola proyek konstruksi bangunan dan infrastruktur dari perencanaan hingga selesai.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '🏗️', tags: ['Konstruksi', 'MS Project', 'BIM'], demand: 'Tinggi'
  },
  'Visual Merchandiser': {
    description: 'Merancang tampilan produk di toko untuk menarik perhatian dan meningkatkan penjualan.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🛍️', tags: ['Retail', 'Display', 'Brand Activation'], demand: 'Sedang'
  },
  'Konsultan Tata Ruang': {
    description: 'Memberikan konsultasi perencanaan tata ruang wilayah untuk pemerintah dan swasta.',
    salaryRange: '8 - 22 jt/bln', salaryMin: 8, salaryMax: 22,
    emoji: '🏙️', tags: ['Urban Planning', 'GIS', 'Kebijakan'], demand: 'Sedang'
  },
  // ── Kesehatan ────────────────────────────────────────────────────────────
  'Dokter': {
    description: 'Mendiagnosis, mengobati, dan mencegah penyakit untuk meningkatkan kesehatan pasien.',
    salaryRange: '10 - 50+ jt/bln', salaryMin: 10, salaryMax: 50,
    emoji: '🩺', tags: ['Klinik', 'Diagnosis', 'Terapeutik'], demand: 'Sangat Tinggi'
  },
  'Dokter Gigi': {
    description: 'Merawat kesehatan gigi dan mulut pasien melalui pemeriksaan, perawatan, dan pencegahan.',
    salaryRange: '8 - 30 jt/bln', salaryMin: 8, salaryMax: 30,
    emoji: '🦷', tags: ['Konservasi', 'Ortodonti', 'Bedah Mulut'], demand: 'Tinggi'
  },
  'Perawat': {
    description: 'Memberikan asuhan keperawatan langsung kepada pasien di berbagai fasilitas kesehatan.',
    salaryRange: '5 - 12 jt/bln', salaryMin: 5, salaryMax: 12,
    emoji: '🏥', tags: ['Asuhan Keperawatan', 'ICU', 'Gawat Darurat'], demand: 'Sangat Tinggi'
  },
  'Bidan': {
    description: 'Memberikan pelayanan kesehatan ibu dan bayi baru lahir secara komprehensif.',
    salaryRange: '5 - 12 jt/bln', salaryMin: 5, salaryMax: 12,
    emoji: '👶', tags: ['Obstetri', 'KB', 'Neonatus'], demand: 'Tinggi'
  },
  'Apoteker': {
    description: 'Mengelola dan mendistribusikan obat-obatan serta memberikan konsultasi farmasi.',
    salaryRange: '6 - 15 jt/bln', salaryMin: 6, salaryMax: 15,
    emoji: '💊', tags: ['Farmasi', 'Farmakologi', 'Konsultasi Obat'], demand: 'Tinggi'
  },
  'Fisioterapis': {
    description: 'Membantu pemulihan fungsi gerak pasien melalui terapi fisik yang terstruktur.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '💪', tags: ['Rehabilitasi', 'Manual Therapy', 'Elektroterapi'], demand: 'Tinggi'
  },
  'Ahli Gizi': {
    description: 'Memberikan konsultasi nutrisi dan merancang program gizi untuk individu dan institusi.',
    salaryRange: '5 - 12 jt/bln', salaryMin: 5, salaryMax: 12,
    emoji: '🥗', tags: ['Nutrisi', 'Diet Plan', 'Gizi Klinik'], demand: 'Tinggi'
  },
  'Epidemiolog': {
    description: 'Mempelajari pola dan penyebab penyakit di populasi untuk mendukung kebijakan kesehatan.',
    salaryRange: '7 - 18 jt/bln', salaryMin: 7, salaryMax: 18,
    emoji: '🔬', tags: ['Epidemiologi', 'Biostatistik', 'Surveilans'], demand: 'Tinggi'
  },
  'Penyuluh Kesehatan': {
    description: 'Mengedukasi masyarakat tentang pola hidup sehat dan pencegahan penyakit.',
    salaryRange: '4 - 10 jt/bln', salaryMin: 4, salaryMax: 10,
    emoji: '🌍', tags: ['Promosi Kesehatan', 'Komunikasi', 'Edukasi'], demand: 'Sedang'
  },
  'Peneliti Kesehatan': {
    description: 'Melakukan penelitian ilmiah di bidang kesehatan untuk mengembangkan pengetahuan medis.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🔭', tags: ['Riset', 'Metodologi', 'Publikasi'], demand: 'Sedang'
  },
  'Psikolog': {
    description: 'Membantu individu mengatasi masalah psikologis melalui asesmen dan intervensi profesional.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '🧠', tags: ['Konseling', 'Asesmen', 'Psikoterapi'], demand: 'Sangat Tinggi'
  },
  'Konselor': {
    description: 'Memberikan bimbingan dan konseling untuk membantu individu mengembangkan diri.',
    salaryRange: '4 - 12 jt/bln', salaryMin: 4, salaryMax: 12,
    emoji: '🤝', tags: ['Konseling', 'BK', 'Pengembangan Diri'], demand: 'Sedang'
  },
  'Manajer Pelayanan Kesehatan': {
    description: 'Mengelola operasional fasilitas kesehatan untuk memastikan kualitas layanan yang optimal.',
    salaryRange: '10 - 25 jt/bln', salaryMin: 10, salaryMax: 25,
    emoji: '🏨', tags: ['Manajemen RS', 'Akreditasi', 'Mutu Layanan'], demand: 'Tinggi'
  },
  'Ahli K3': {
    description: 'Memastikan keselamatan dan kesehatan kerja di lingkungan industri sesuai regulasi.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '⛑️', tags: ['K3', 'HSE', 'OHSAS'], demand: 'Tinggi'
  },
  'Konsultan K3': {
    description: 'Memberikan konsultasi sistem keselamatan kerja kepada perusahaan dan industri.',
    salaryRange: '8 - 22 jt/bln', salaryMin: 8, salaryMax: 22,
    emoji: '📋', tags: ['Audit K3', 'SMK3', 'Regulasi'], demand: 'Tinggi'
  },
  'Manajer Rumah Sakit': {
    description: 'Memimpin dan mengelola operasional rumah sakit secara menyeluruh dan efisien.',
    salaryRange: '12 - 35 jt/bln', salaryMin: 12, salaryMax: 35,
    emoji: '🏥', tags: ['Manajemen RS', 'Akreditasi JCI', 'Leadership'], demand: 'Tinggi'
  },
  'Administrator Kesehatan': {
    description: 'Mengelola administrasi fasilitas kesehatan termasuk SDM, keuangan, dan layanan.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🗂️', tags: ['Administrasi', 'Rekam Medis', 'RS Management'], demand: 'Sedang'
  },
  'Analis Sistem Informasi Kesehatan': {
    description: 'Mengelola dan menganalisis data kesehatan menggunakan sistem informasi rumah sakit.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '💊', tags: ['SIM RS', 'Coding Medis', 'Data Kesehatan'], demand: 'Tinggi'
  },
  // ── Pendidikan ───────────────────────────────────────────────────────────
  'Guru': {
    description: 'Mendidik dan membimbing siswa untuk berkembang secara akademis, sosial, dan emosional.',
    salaryRange: '4 - 12 jt/bln', salaryMin: 4, salaryMax: 12,
    emoji: '📚', tags: ['Pedagogik', 'Kurikulum', 'Karakter'], demand: 'Sangat Tinggi'
  },
  'Dosen': {
    description: 'Mengajar, meneliti, dan mengabdi kepada masyarakat di perguruan tinggi.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '🎓', tags: ['Pengajaran', 'Riset', 'Publikasi'], demand: 'Tinggi'
  },
  'Pengembang Kurikulum': {
    description: 'Merancang dan mengembangkan kurikulum pendidikan yang relevan dan berkualitas.',
    salaryRange: '6 - 15 jt/bln', salaryMin: 6, salaryMax: 15,
    emoji: '📝', tags: ['Kurikulum', 'Asesmen', 'Pembelajaran'], demand: 'Sedang'
  },
  'Instruktur Pelatihan': {
    description: 'Melatih dan mengembangkan kompetensi profesional karyawan dan peserta pelatihan.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🏫', tags: ['Training', 'L&D', 'HRD'], demand: 'Sedang'
  },
  'Trainer': {
    description: 'Memberikan pelatihan dan pengembangan kompetensi di berbagai bidang secara profesional.',
    salaryRange: '5 - 18 jt/bln', salaryMin: 5, salaryMax: 18,
    emoji: '🏆', tags: ['Training', 'Coaching', 'Facilitation'], demand: 'Tinggi'
  },
  'Guru PAUD': {
    description: 'Mendidik dan mengembangkan potensi anak usia dini melalui pendekatan bermain sambil belajar.',
    salaryRange: '3 - 8 jt/bln', salaryMin: 3, salaryMax: 8,
    emoji: '🧒', tags: ['PAUD', 'Stimulasi', 'Tumbuh Kembang'], demand: 'Tinggi'
  },
  'Guru Sekolah Dasar': {
    description: 'Mengajar semua mata pelajaran kepada siswa SD dengan pendekatan yang menyenangkan.',
    salaryRange: '3 - 10 jt/bln', salaryMin: 3, salaryMax: 10,
    emoji: '📒', tags: ['PGSD', 'Pedagogik', 'Karakter'], demand: 'Sangat Tinggi'
  },
  'Guru Bimbingan dan Konseling': {
    description: 'Membantu siswa dalam perkembangan pribadi, sosial, dan perencanaan karier.',
    salaryRange: '4 - 10 jt/bln', salaryMin: 4, salaryMax: 10,
    emoji: '💙', tags: ['BK', 'Konseling', 'Karier'], demand: 'Sedang'
  },
  'Guru Pendidikan Khusus': {
    description: 'Mendidik anak berkebutuhan khusus dengan metode adaptif dan pendekatan inklusif.',
    salaryRange: '4 - 10 jt/bln', salaryMin: 4, salaryMax: 10,
    emoji: '💙', tags: ['Inklusi', 'ABK', 'Terapi Perilaku'], demand: 'Tinggi'
  },
  'Peneliti Pendidikan': {
    description: 'Melakukan penelitian ilmiah tentang sistem, metode, dan kebijakan pendidikan.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '🔍', tags: ['Riset', 'Evaluasi', 'Kebijakan Pendidikan'], demand: 'Sedang'
  },
  'Konsultan Pendidikan': {
    description: 'Memberikan konsultasi perencanaan pendidikan, karier, dan pemilihan jurusan.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🎓', tags: ['Konsultasi', 'Karier', 'Perencanaan Studi'], demand: 'Sedang'
  },
  'Widyaiswara': {
    description: 'Pelatih profesional ASN yang mendidik dan melatih pegawai pemerintah untuk meningkatkan kompetensi.',
    salaryRange: '6 - 15 jt/bln', salaryMin: 6, salaryMax: 15,
    emoji: '🏛️', tags: ['Diklat', 'ASN', 'Pelatihan PNS'], demand: 'Sedang'
  },
  // ── Hukum & Pemerintahan ─────────────────────────────────────────────────
  'Advokat': {
    description: 'Membela dan mewakili klien dalam proses hukum serta memberikan konsultasi hukum.',
    salaryRange: '8 - 40 jt/bln', salaryMin: 8, salaryMax: 40,
    emoji: '⚖️', tags: ['Litigasi', 'Legal Advisory', 'Hukum Perdata'], demand: 'Tinggi'
  },
  'Jaksa': {
    description: 'Melakukan penuntutan perkara pidana dan mewakili kepentingan negara di pengadilan.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🏛️', tags: ['Penuntutan', 'Hukum Pidana', 'ASN'], demand: 'Sedang'
  },
  'Diplomat': {
    description: 'Mewakili kepentingan negara di luar negeri melalui negosiasi dan hubungan diplomatik.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '🌐', tags: ['Diplomasi', 'HI', 'Multilateral'], demand: 'Sedang'
  },
  'Analis Kebijakan Publik': {
    description: 'Menganalisis dan merekomendasikan kebijakan publik berdasarkan data dan riset mendalam.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '📜', tags: ['Policy Analysis', 'Riset', 'Evaluasi Program'], demand: 'Sedang'
  },
  'Peneliti Politik': {
    description: 'Meneliti fenomena politik, pemilu, dan kebijakan untuk kepentingan akademis dan konsultasi.',
    salaryRange: '6 - 15 jt/bln', salaryMin: 6, salaryMax: 15,
    emoji: '🗳️', tags: ['Riset Politik', 'Survei', 'Analisis Data'], demand: 'Sedang'
  },
  'Kriminolog': {
    description: 'Mengkaji kejahatan dan perilaku kriminal untuk mendukung penegakan hukum dan kebijakan.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '🔍', tags: ['Kriminologi', 'Forensik', 'Penegakan Hukum'], demand: 'Sedang'
  },
  'Aparatur Sipil Negara (ASN)': {
    description: 'Melayani dan mengelola administrasi pemerintahan di berbagai instansi pemerintah.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🏛️', tags: ['Pemerintahan', 'Pelayanan Publik', 'Administrasi'], demand: 'Sangat Tinggi'
  },
  'Konsultan Hukum': {
    description: 'Memberikan saran hukum kepada perusahaan, organisasi, dan individu untuk menghindari risiko hukum.',
    salaryRange: '8 - 30 jt/bln', salaryMin: 8, salaryMax: 30,
    emoji: '📋', tags: ['Legal Advice', 'Kontrak', 'Compliance'], demand: 'Tinggi'
  },
  'Pegawai Organisasi Internasional': {
    description: 'Bekerja di lembaga internasional seperti PBB, WHO, atau ASEAN dalam berbagai kapasitas.',
    salaryRange: '15 - 50+ jt/bln', salaryMin: 15, salaryMax: 50,
    emoji: '🌍', tags: ['UN', 'NGO', 'International Development'], demand: 'Sedang'
  },
  'Administrator Publik': {
    description: 'Mengelola administrasi dan program-program di instansi pemerintah pusat maupun daerah.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🏛️', tags: ['Administrasi', 'Pemerintahan', 'Program Publik'], demand: 'Sedang'
  },
  'Konsultan Pemerintahan': {
    description: 'Memberikan konsultasi strategis kepada instansi pemerintah dalam hal kebijakan dan tata kelola.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '📊', tags: ['Good Governance', 'Kebijakan', 'Reformasi Birokrasi'], demand: 'Sedang'
  },
  'Peneliti Kebijakan': {
    description: 'Melakukan penelitian mendalam tentang efektivitas kebijakan publik dan dampaknya bagi masyarakat.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '📝', tags: ['Policy Research', 'Evaluasi', 'Sosial'], demand: 'Sedang'
  },
  'Pengelola Program Pemerintah': {
    description: 'Mengelola dan mengimplementasikan program-program pemerintah untuk kepentingan masyarakat.',
    salaryRange: '5 - 14 jt/bln', salaryMin: 5, salaryMax: 14,
    emoji: '📋', tags: ['Program Management', 'Anggaran', 'Monitoring'], demand: 'Sedang'
  },
  // ── Bisnis & Manajemen ───────────────────────────────────────────────────
  'Manajer': {
    description: 'Memimpin tim dan departemen untuk mencapai tujuan organisasi secara efektif.',
    salaryRange: '8 - 30 jt/bln', salaryMin: 8, salaryMax: 30,
    emoji: '👔', tags: ['Leadership', 'Team Management', 'Strategy'], demand: 'Tinggi'
  },
  'Konsultan Bisnis': {
    description: 'Menganalisis masalah bisnis dan memberikan solusi strategis untuk meningkatkan kinerja perusahaan.',
    salaryRange: '10 - 35 jt/bln', salaryMin: 10, salaryMax: 35,
    emoji: '💡', tags: ['Strategy', 'Business Analysis', 'Change Management'], demand: 'Tinggi'
  },
  'Wirausahawan': {
    description: 'Mendirikan dan mengembangkan bisnis sendiri dengan mengidentifikasi peluang pasar.',
    salaryRange: '5 - 100+ jt/bln', salaryMin: 5, salaryMax: 100,
    emoji: '🚀', tags: ['Entrepreneur', 'Business Development', 'Innovation'], demand: 'Tinggi'
  },
  'Business Development Officer': {
    description: 'Mengidentifikasi dan mengembangkan peluang bisnis baru untuk pertumbuhan perusahaan.',
    salaryRange: '7 - 20 jt/bln', salaryMin: 7, salaryMax: 20,
    emoji: '📈', tags: ['Business Development', 'Partnership', 'Sales'], demand: 'Tinggi'
  },
  'Analis Bisnis': {
    description: 'Menganalisis proses bisnis dan kebutuhan stakeholder untuk menemukan solusi yang tepat.',
    salaryRange: '7 - 20 jt/bln', salaryMin: 7, salaryMax: 20,
    emoji: '📊', tags: ['Business Analysis', 'Process Mapping', 'Requirements'], demand: 'Tinggi'
  },
  'Manajer Pemasaran': {
    description: 'Merencanakan dan melaksanakan strategi pemasaran untuk meningkatkan penjualan dan brand awareness.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '📣', tags: ['Marketing Strategy', 'Brand', 'Campaign Management'], demand: 'Tinggi'
  },
  'Manajer Merek': {
    description: 'Membangun dan mengelola identitas merek untuk memperkuat posisi di pasar.',
    salaryRange: '10 - 28 jt/bln', salaryMin: 10, salaryMax: 28,
    emoji: '🏷️', tags: ['Brand Management', 'Marketing', 'Consumer Insight'], demand: 'Tinggi'
  },
  'Konsultan Manajemen': {
    description: 'Memberikan solusi strategis untuk meningkatkan kinerja dan efisiensi organisasi.',
    salaryRange: '12 - 40 jt/bln', salaryMin: 12, salaryMax: 40,
    emoji: '💼', tags: ['Management Consulting', 'Strategy', 'Transformation'], demand: 'Tinggi'
  },
  // ── Keuangan & Akuntansi ─────────────────────────────────────────────────
  'Akuntan': {
    description: 'Menyiapkan dan menganalisis laporan keuangan serta memastikan kepatuhan akuntansi.',
    salaryRange: '5 - 18 jt/bln', salaryMin: 5, salaryMax: 18,
    emoji: '📑', tags: ['Akuntansi', 'PSAK', 'SAP'], demand: 'Sangat Tinggi'
  },
  'Auditor': {
    description: 'Memeriksa dan mengevaluasi laporan keuangan serta pengendalian internal perusahaan.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '🔍', tags: ['Audit', 'Internal Control', 'IFRS'], demand: 'Sangat Tinggi'
  },
  'Analis Keuangan': {
    description: 'Menganalisis laporan keuangan dan kondisi pasar untuk mendukung keputusan investasi.',
    salaryRange: '7 - 22 jt/bln', salaryMin: 7, salaryMax: 22,
    emoji: '💹', tags: ['Financial Analysis', 'Valuation', 'Excel'], demand: 'Sangat Tinggi'
  },
  'Konsultan Pajak': {
    description: 'Memberikan konsultasi perpajakan dan membantu klien meminimalkan beban pajak secara legal.',
    salaryRange: '7 - 25 jt/bln', salaryMin: 7, salaryMax: 25,
    emoji: '🧾', tags: ['Pajak', 'Tax Planning', 'Brevet Pajak'], demand: 'Tinggi'
  },
  'Manajer Keuangan': {
    description: 'Mengelola arus kas, anggaran, dan strategi keuangan perusahaan untuk kesehatan finansial.',
    salaryRange: '12 - 35 jt/bln', salaryMin: 12, salaryMax: 35,
    emoji: '💰', tags: ['Financial Management', 'Budgeting', 'Treasury'], demand: 'Sangat Tinggi'
  },
  'Perencana Keuangan': {
    description: 'Membantu individu dan keluarga merencanakan keuangan jangka panjang secara komprehensif.',
    salaryRange: '7 - 22 jt/bln', salaryMin: 7, salaryMax: 22,
    emoji: '📈', tags: ['CFP', 'Investasi', 'Asuransi'], demand: 'Tinggi'
  },
  'Analis Investasi': {
    description: 'Meneliti peluang investasi di pasar modal dan memberikan rekomendasi berbasis data.',
    salaryRange: '8 - 30 jt/bln', salaryMin: 8, salaryMax: 30,
    emoji: '📊', tags: ['Equity Research', 'Fundamental Analysis', 'CFA'], demand: 'Tinggi'
  },
  'Analis Risiko': {
    description: 'Mengidentifikasi, menilai, dan mengelola risiko keuangan dan operasional.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '⚖️', tags: ['Risk Management', 'ERM', 'Basel'], demand: 'Tinggi'
  },
  'Aktuaris': {
    description: 'Menghitung dan mengelola risiko keuangan menggunakan matematika dan statistika.',
    salaryRange: '10 - 35 jt/bln', salaryMin: 10, salaryMax: 35,
    emoji: '🔢', tags: ['Aktuaria', 'Asuransi', 'Risk Modeling'], demand: 'Tinggi'
  },
  'Statistisi': {
    description: 'Mengumpulkan, menganalisis, dan menginterpretasikan data statistik untuk berbagai keperluan.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '📐', tags: ['Statistika', 'Data Analysis', 'R/Python'], demand: 'Tinggi'
  },
  'Administrator Bisnis': {
    description: 'Mengelola operasional dan administrasi organisasi bisnis secara efisien.',
    salaryRange: '5 - 14 jt/bln', salaryMin: 5, salaryMax: 14,
    emoji: '💼', tags: ['Administrasi', 'Office Management', 'Koordinasi'], demand: 'Sedang'
  },
  'Ekonom': {
    description: 'Menganalisis tren ekonomi dan memberikan rekomendasi kebijakan atau strategi bisnis.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '📈', tags: ['Ekonometrika', 'Analisis Kebijakan', 'Riset Ekonomi'], demand: 'Sedang'
  },
  'Perencana Pembangunan': {
    description: 'Merencanakan program pembangunan daerah dan nasional yang berkelanjutan.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '🏗️', tags: ['Bappenas', 'Perencanaan', 'Evaluasi Program'], demand: 'Sedang'
  },
  'Pemeriksa Pajak': {
    description: 'Memeriksa kepatuhan wajib pajak terhadap regulasi perpajakan yang berlaku.',
    salaryRange: '6 - 15 jt/bln', salaryMin: 6, salaryMax: 15,
    emoji: '🔍', tags: ['Pemeriksaan Pajak', 'DJP', 'Hukum Pajak'], demand: 'Sedang'
  },
  // ── SDM & Sosial ─────────────────────────────────────────────────────────
  'Manajer Sumber Daya Manusia (SDM)': {
    description: 'Mengelola seluruh aspek SDM perusahaan mulai dari rekrutmen hingga pengembangan karyawan.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '👥', tags: ['MSDM', 'Rekrutmen', 'Talent Management'], demand: 'Tinggi'
  },
  'Rekruter': {
    description: 'Mencari, menyeleksi, dan merekrut kandidat terbaik sesuai kebutuhan organisasi.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🔍', tags: ['Rekrutmen', 'Headhunting', 'HR'], demand: 'Tinggi'
  },
  'Konsultan SDM': {
    description: 'Memberikan konsultasi manajemen SDM kepada perusahaan untuk meningkatkan kinerja organisasi.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '💡', tags: ['HR Consulting', 'Org. Development', 'Kompensasi'], demand: 'Tinggi'
  },
  'Konsultan Organisasi': {
    description: 'Membantu organisasi merancang struktur dan budaya yang mendukung tujuan strategis.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '🏢', tags: ['Org. Design', 'Change Management', 'OD'], demand: 'Sedang'
  },
  'Manajer Program Kesehatan': {
    description: 'Merencanakan dan mengelola program-program kesehatan masyarakat secara komprehensif.',
    salaryRange: '8 - 20 jt/bln', salaryMin: 8, salaryMax: 20,
    emoji: '🌍', tags: ['Program Management', 'Kesehatan', 'Monitoring'], demand: 'Sedang'
  },
  'Manajer Program Sosial': {
    description: 'Merencanakan dan mengelola program sosial untuk pemberdayaan masyarakat.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🤝', tags: ['Social Program', 'CSR', 'Community Development'], demand: 'Sedang'
  },
  // ── Komunikasi & Media ───────────────────────────────────────────────────
  'Public Relations Officer': {
    description: 'Mengelola citra dan hubungan organisasi dengan media, publik, dan pemangku kepentingan.',
    salaryRange: '5 - 18 jt/bln', salaryMin: 5, salaryMax: 18,
    emoji: '📣', tags: ['PR', 'Media Relations', 'Crisis Comm.'], demand: 'Tinggi'
  },
  'Spesialis Periklanan': {
    description: 'Merancang dan mengelola kampanye iklan yang efektif untuk berbagai merek dan produk.',
    salaryRange: '5 - 18 jt/bln', salaryMin: 5, salaryMax: 18,
    emoji: '📺', tags: ['Advertising', 'Campaign', 'Media Buying'], demand: 'Tinggi'
  },
  'Content Creator': {
    description: 'Membuat konten digital yang menarik dan relevan untuk berbagai platform media sosial.',
    salaryRange: '4 - 25 jt/bln', salaryMin: 4, salaryMax: 25,
    emoji: '🎥', tags: ['Content', 'Social Media', 'Storytelling'], demand: 'Sangat Tinggi'
  },
  'Copywriter': {
    description: 'Menulis teks persuasif untuk iklan, konten pemasaran, dan komunikasi bisnis.',
    salaryRange: '4 - 15 jt/bln', salaryMin: 4, salaryMax: 15,
    emoji: '✍️', tags: ['Copywriting', 'Content Marketing', 'SEO Writing'], demand: 'Tinggi'
  },
  'Event Organizer': {
    description: 'Merencanakan dan mengelola acara dari skala kecil hingga besar secara profesional.',
    salaryRange: '5 - 20 jt/bln', salaryMin: 5, salaryMax: 20,
    emoji: '🎉', tags: ['Event Management', 'Logistik Acara', 'Vendor'], demand: 'Sedang'
  },
  'Hubungan Media': {
    description: 'Membangun dan mempertahankan hubungan positif dengan jurnalis dan media massa.',
    salaryRange: '6 - 15 jt/bln', salaryMin: 6, salaryMax: 15,
    emoji: '📰', tags: ['Media Relations', 'Press Release', 'Komunikasi'], demand: 'Sedang'
  },
  'Wirausahawan Kreatif': {
    description: 'Membangun bisnis berbasis kreativitas di industri seni, desain, hiburan, atau media.',
    salaryRange: '5 - 50+ jt/bln', salaryMin: 5, salaryMax: 50,
    emoji: '🎨', tags: ['Creative Business', 'Industri Kreatif', 'Inovasi'], demand: 'Tinggi'
  },
  'Konsultan Komunikasi': {
    description: 'Memberikan strategi komunikasi yang tepat untuk organisasi dalam berbagai situasi.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '💬', tags: ['Komunikasi Strategis', 'PR', 'Crisis Management'], demand: 'Sedang'
  },
  // ── Linguistik & Bahasa ──────────────────────────────────────────────────
  'Guru Bahasa Inggris': {
    description: 'Mengajar bahasa Inggris secara komunikatif dan efektif di berbagai jenjang pendidikan.',
    salaryRange: '4 - 12 jt/bln', salaryMin: 4, salaryMax: 12,
    emoji: '🇬🇧', tags: ['TEFL', 'EFL', 'Teaching'], demand: 'Tinggi'
  },
  'Penerjemah': {
    description: 'Menerjemahkan teks tertulis antar bahasa secara akurat dan alami.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '📝', tags: ['Translation', 'Penerjemahan', 'CAT Tools'], demand: 'Sedang'
  },
  'Interpreter': {
    description: 'Menginterpretasikan percakapan lisan antar bahasa secara real-time dalam berbagai konteks.',
    salaryRange: '5 - 18 jt/bln', salaryMin: 5, salaryMax: 18,
    emoji: '🗣️', tags: ['Interpretasi', 'Simultaneous', 'Conference'], demand: 'Sedang'
  },
  'Linguis': {
    description: 'Mengkaji dan meneliti struktur, sejarah, dan fungsi bahasa secara ilmiah.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🔤', tags: ['Linguistik', 'Fonetik', 'Pragmatik'], demand: 'Sedang'
  },
  'Peneliti Bahasa': {
    description: 'Meneliti fenomena bahasa dan linguistik untuk pengembangan ilmu dan kebijakan bahasa.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '🔬', tags: ['Riset Bahasa', 'Linguistik Komputasional', 'Sosiolinguistik'], demand: 'Sedang'
  },
  'Penulis': {
    description: 'Menulis karya fiksi, non-fiksi, jurnalistik, atau teknis untuk berbagai publikasi.',
    salaryRange: '4 - 20 jt/bln', salaryMin: 4, salaryMax: 20,
    emoji: '✍️', tags: ['Writing', 'Storytelling', 'Publishing'], demand: 'Sedang'
  },
  'Editor': {
    description: 'Menyunting dan memperbaiki naskah tulisan agar lebih baik secara bahasa dan isi.',
    salaryRange: '4 - 15 jt/bln', salaryMin: 4, salaryMax: 15,
    emoji: '📖', tags: ['Editing', 'Proofreading', 'Publishing'], demand: 'Sedang'
  },
  'Content Writer': {
    description: 'Membuat konten tulisan berkualitas untuk website, blog, dan media digital.',
    salaryRange: '4 - 12 jt/bln', salaryMin: 4, salaryMax: 12,
    emoji: '💻', tags: ['SEO Writing', 'Content Marketing', 'Blog'], demand: 'Tinggi'
  },
  // ── Seni Pertunjukan ─────────────────────────────────────────────────────
  'Aktor': {
    description: 'Memerankan karakter dalam film, teater, atau produksi media lainnya.',
    salaryRange: '5 - 50+ jt/bln', salaryMin: 5, salaryMax: 50,
    emoji: '🎭', tags: ['Akting', 'Film', 'Teater'], demand: 'Sedang'
  },
  'Pelatih Seni': {
    description: 'Melatih dan mengembangkan bakat seni siswa atau peserta didik di berbagai bidang seni.',
    salaryRange: '4 - 12 jt/bln', salaryMin: 4, salaryMax: 12,
    emoji: '🎨', tags: ['Seni', 'Pelatihan', 'Kreativitas'], demand: 'Sedang'
  },
  'Seniman Pertunjukan': {
    description: 'Menampilkan seni pertunjukan seperti tari, musik, atau teater kepada publik.',
    salaryRange: '3 - 20 jt/bln', salaryMin: 3, salaryMax: 20,
    emoji: '🎭', tags: ['Tari', 'Musik', 'Pertunjukan'], demand: 'Sedang'
  },
  'Guru Bahasa': {
    description: 'Mengajar bahasa (Indonesia/Inggris/asing) secara komunikatif di sekolah atau lembaga kursus.',
    salaryRange: '4 - 12 jt/bln', salaryMin: 4, salaryMax: 12,
    emoji: '🗣️', tags: ['Pengajaran Bahasa', 'BIPA', 'Komunikatif'], demand: 'Tinggi'
  },
  // ── Lain-lain ─────────────────────────────────────────────────────────────
  'Koordinator Proyek': {
    description: 'Mengkoordinasikan berbagai aspek proyek untuk memastikan kelancaran pelaksanaan.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '📋', tags: ['Koordinasi', 'Proyek', 'Komunikasi'], demand: 'Sedang'
  },
  'Manajer Rekayasa': {
    description: 'Memimpin tim insinyur dan mengelola proyek rekayasa berskala besar.',
    salaryRange: '12 - 35 jt/bln', salaryMin: 12, salaryMax: 35,
    emoji: '⚙️', tags: ['Engineering Management', 'Teknik', 'Leadership'], demand: 'Tinggi'
  },
  'Peneliti': {
    description: 'Melakukan penelitian ilmiah di berbagai bidang untuk mengembangkan pengetahuan baru.',
    salaryRange: '6 - 20 jt/bln', salaryMin: 6, salaryMax: 20,
    emoji: '🔬', tags: ['Riset', 'Publikasi', 'Metodologi'], demand: 'Sedang'
  },
  'Pengelola Fasilitas Kesehatan': {
    description: 'Mengelola operasional fasilitas kesehatan seperti puskesmas, klinik, atau apotek.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🏥', tags: ['Faskes', 'Manajemen', 'Kesehatan'], demand: 'Sedang'
  },
  'Analis Kebijakan Kesehatan': {
    description: 'Menganalisis kebijakan kesehatan dan dampaknya terhadap sistem pelayanan kesehatan.',
    salaryRange: '7 - 18 jt/bln', salaryMin: 7, salaryMax: 18,
    emoji: '📜', tags: ['Kebijakan Kesehatan', 'Evaluasi', 'Sistem Kesehatan'], demand: 'Sedang'
  },
  'Konsultan Administrasi Kesehatan': {
    description: 'Memberikan konsultasi manajemen administrasi untuk fasilitas dan sistem kesehatan.',
    salaryRange: '8 - 20 jt/bln', salaryMin: 8, salaryMax: 20,
    emoji: '💼', tags: ['Konsultasi', 'RS', 'Administrasi Kesehatan'], demand: 'Sedang'
  },
  'Pengelola Lembaga Pendidikan': {
    description: 'Mengelola operasional sekolah, universitas, atau lembaga kursus secara profesional.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🏫', tags: ['Manajemen Pendidikan', 'Akreditasi', 'Leadership'], demand: 'Sedang'
  },
  'Konsultan Bisnis Digital': {
    description: 'Membantu perusahaan dalam transformasi digital dan pengembangan strategi bisnis online.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '📱', tags: ['Digital Strategy', 'E-Commerce', 'Martech'], demand: 'Tinggi'
  },
  'Digital Marketing Specialist': {
    description: 'Mengelola dan mengoptimalkan seluruh aktivitas pemasaran digital perusahaan.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '📱', tags: ['Digital Marketing', 'SEO', 'SEM', 'Analytics'], demand: 'Sangat Tinggi'
  },
  'Laboran': {
    description: 'Mengelola dan mengoperasikan peralatan laboratorium untuk mendukung kegiatan penelitian.',
    salaryRange: '4 - 10 jt/bln', salaryMin: 4, salaryMax: 10,
    emoji: '🔬', tags: ['Laboratorium', 'Instrumentasi', 'Keselamatan Lab'], demand: 'Sedang'
  },
  'Administrator Rumah Sakit': {
    description: 'Mengelola administrasi dan tata kelola rumah sakit secara komprehensif.',
    salaryRange: '6 - 18 jt/bln', salaryMin: 6, salaryMax: 18,
    emoji: '🏥', tags: ['Hospital Admin', 'Rekam Medis', 'BPJS'], demand: 'Sedang'
  },
  'Auditor Keselamatan Kerja': {
    description: 'Mengaudit sistem dan program keselamatan kerja di perusahaan untuk memastikan kepatuhan regulasi.',
    salaryRange: '7 - 18 jt/bln', salaryMin: 7, salaryMax: 18,
    emoji: '⛑️', tags: ['Audit K3', 'ISO 45001', 'Inspeksi'], demand: 'Sedang'
  },
  'Manajer SDM': {
    description: 'Mengelola seluruh fungsi SDM perusahaan termasuk rekrutmen, kompensasi, dan pengembangan.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '👥', tags: ['HR Management', 'Talent', 'Kompensasi'], demand: 'Tinggi'
  },
  'Analis Operasional': {
    description: 'Menganalisis proses operasional untuk mengidentifikasi inefisiensi dan merekomendasikan perbaikan.',
    salaryRange: '6 - 16 jt/bln', salaryMin: 6, salaryMax: 16,
    emoji: '📊', tags: ['Operations', 'Lean', 'Continuous Improvement'], demand: 'Sedang'
  },
  'Creative Technologist': {
    description: 'Menggabungkan teknologi dan kreativitas untuk menciptakan pengalaman digital yang inovatif.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '🚀', tags: ['Creative Tech', 'AR/VR', 'Interactive'], demand: 'Tinggi'
  },
  'Product Designer': {
    description: 'Merancang pengalaman produk digital dari riset pengguna hingga prototyping.',
    salaryRange: '8 - 25 jt/bln', salaryMin: 8, salaryMax: 25,
    emoji: '🎨', tags: ['Product Design', 'UX Research', 'Prototyping'], demand: 'Sangat Tinggi'
  },
  'Konsultan Teknologi': {
    description: 'Memberikan saran strategis tentang adopsi dan implementasi teknologi untuk bisnis.',
    salaryRange: '10 - 30 jt/bln', salaryMin: 10, salaryMax: 30,
    emoji: '💡', tags: ['Tech Strategy', 'IT Consulting', 'Digital Transformation'], demand: 'Tinggi'
  },
  'Konsultan Teknologi Kreatif': {
    description: 'Mengintegrasikan teknologi dengan industri kreatif untuk solusi inovatif.',
    salaryRange: '8 - 22 jt/bln', salaryMin: 8, salaryMax: 22,
    emoji: '🎭', tags: ['Creative Tech', 'Media', 'Inovasi'], demand: 'Sedang'
  },
  'Peneliti Sosial': {
    description: 'Melakukan penelitian sosial untuk memahami fenomena masyarakat dan mendukung kebijakan.',
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '🔍', tags: ['Riset Sosial', 'Kualitatif', 'Kuantitatif'], demand: 'Sedang'
  },
}

// ─── Lookup helper ────────────────────────────────────────────────────────────
export const getCareerMeta = (careerName: string): CareerMeta => {
  if (CAREER_META[careerName]) return CAREER_META[careerName]

  // Partial match
  const normalized = careerName.toLowerCase()
  const found = Object.entries(CAREER_META).find(([key]) =>
    key.toLowerCase().includes(normalized.split(' ').slice(-1)[0]) ||
    normalized.includes(key.toLowerCase().split(' ').slice(-1)[0])
  )
  if (found) return found[1]

  // Default fallback
  return {
    description: `${careerName} adalah profesi yang membutuhkan keahlian spesifik dan komitmen profesional tinggi.`,
    salaryRange: '5 - 15 jt/bln', salaryMin: 5, salaryMax: 15,
    emoji: '💼', tags: ['Profesional', 'Karier'], demand: 'Sedang'
  }
}
