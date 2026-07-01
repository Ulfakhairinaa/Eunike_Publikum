// ─── Major Metadata ───────────────────────────────────────────────────────────
// Metadata statis per jurusan: dipakai di halaman Detail Jurusan & Rekomendasi

export type MajorMeta = {
  degree: string
  group: 'Saintek' | 'Soshum'
  prospect: 'Sangat Luas' | 'Luas' | 'Baik'
  description: string
  fullDescription: string
  subjects: string[]
  emoji: string
  themeColor: string
  keyword: string
}

export const MAJOR_META: Record<string, MajorMeta> = {
  // ── Teknik & Rekayasa ────────────────────────────────────────────────────
  'Teknik Informatika': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Merancang dan mengembangkan sistem perangkat lunak untuk berbagai kebutuhan industri.',
    fullDescription: 'Teknik Informatika mempelajari perancangan, pengembangan, dan penerapan sistem komputer untuk memecahkan masalah nyata. Mahasiswa mendalami algoritma, struktur data, pengembangan web & mobile, kecerdasan buatan, keamanan siber, hingga pengelolaan basis data.',
    subjects: ['Algoritma & Struktur Data', 'Pengembangan Web', 'Kecerdasan Buatan', 'Basis Data', 'Keamanan Informasi', 'Pengembangan Mobile'],
    emoji: '💻', themeColor: 'blue', keyword: 'Logika Tinggi & Teknologi'
  },
  'Sistem Informasi': {
    degree: 'S.Kom.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Menjembatani teknologi dengan kebutuhan bisnis melalui sistem informasi yang efektif.',
    fullDescription: 'Sistem Informasi berfokus pada pengembangan dan pengelolaan sistem berbasis teknologi untuk mendukung proses bisnis dan pengambilan keputusan organisasi secara strategis.',
    subjects: ['Analisis & Desain Sistem', 'Manajemen Basis Data', 'Proyek TI', 'E-Business', 'Business Intelligence', 'Rekayasa Perangkat Lunak'],
    emoji: '🖥️', themeColor: 'indigo', keyword: 'Teknologi & Bisnis'
  },
  'Ilmu Komputer': {
    degree: 'S.Kom.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Mempelajari fondasi teoritis dan praktis ilmu komputasi modern.',
    fullDescription: 'Ilmu Komputer mendalami teori komputasi, algoritma, dan matematika diskrit sebagai fondasi untuk mengembangkan teknologi masa depan termasuk AI dan komputasi kuantum.',
    subjects: ['Matematika Diskrit', 'Teori Bahasa Formal', 'Algoritma Lanjut', 'Kecerdasan Buatan', 'Komputasi Paralel', 'Machine Learning'],
    emoji: '🔬', themeColor: 'blue', keyword: 'Sains & Komputasi'
  },
  'Data Science': {
    degree: 'S.Kom.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Mengolah data besar menjadi wawasan strategis untuk pengambilan keputusan.',
    fullDescription: 'Data Science mempelajari cara mengumpulkan, memproses, menganalisis, dan memvisualisasikan data untuk menghasilkan insight berharga bagi bisnis dan penelitian.',
    subjects: ['Statistika', 'Machine Learning', 'Big Data', 'Visualisasi Data', 'Python/R Programming', 'Deep Learning'],
    emoji: '📊', themeColor: 'teal', keyword: 'Analisis & Prediksi'
  },
  'Statistika': {
    degree: 'S.Si.', group: 'Saintek', prospect: 'Luas',
    description: 'Ilmu pengumpulan, analisis, dan interpretasi data untuk pengambilan keputusan berbasis bukti.',
    fullDescription: 'Statistika mempelajari metode matematika untuk mengumpulkan, menganalisis, dan menyimpulkan data yang digunakan di bidang sains, bisnis, pemerintahan, dan kesehatan.',
    subjects: ['Teori Probabilitas', 'Statistik Inferensi', 'Regresi', 'Sampling', 'Analisis Multivariat', 'Biostatistik'],
    emoji: '📈', themeColor: 'green', keyword: 'Data & Matematika'
  },
  'Aktuaria': {
    degree: 'S.Aktr.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengukur dan mengelola risiko keuangan menggunakan matematika dan statistika.',
    fullDescription: 'Aktuaria menggabungkan matematika, statistika, dan keuangan untuk menganalisis risiko dalam asuransi, investasi, dan program dana pensiun.',
    subjects: ['Matematika Aktuaria', 'Teori Risiko', 'Asuransi Jiwa', 'Keuangan', 'Probabilitas', 'Ekonomi'],
    emoji: '🔢', themeColor: 'indigo', keyword: 'Risiko & Keuangan'
  },
  'Teknik Industri': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Mengoptimalkan sistem produksi dan operasional untuk efisiensi industri.',
    fullDescription: 'Teknik Industri mempelajari perancangan, perbaikan, dan instalasi sistem terintegrasi yang meliputi manusia, material, peralatan, energi, dan informasi.',
    subjects: ['Rekayasa Sistem', 'Manajemen Operasional', 'Ergonomi', 'Simulasi Sistem', 'Perencanaan Produksi', 'Kontrol Kualitas'],
    emoji: '⚙️', themeColor: 'orange', keyword: 'Sistem & Efisiensi'
  },
  'Teknik Elektro': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Merancang sistem kelistrikan, elektronika, dan telekomunikasi modern.',
    fullDescription: 'Teknik Elektro mempelajari dasar kelistrikan, elektronika, sistem tenaga listrik hingga telekomunikasi dan sistem kontrol otomatis.',
    subjects: ['Elektronika', 'Sistem Tenaga Listrik', 'Rangkaian Listrik', 'Telekomunikasi', 'Kontrol Otomatis', 'Embedded System'],
    emoji: '⚡', themeColor: 'yellow', keyword: 'Energi & Elektronika'
  },
  'Teknik Mesin': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Merancang dan mengembangkan mesin serta sistem mekanik untuk industri.',
    fullDescription: 'Teknik Mesin mempelajari prinsip fisika dan matematika untuk menganalisis, merancang, dan memelihara sistem mekanik dan mesin industri.',
    subjects: ['Statika & Dinamika', 'Termodinamika', 'Mekanika Fluida', 'Material Teknik', 'Perancangan Mesin', 'Manufaktur'],
    emoji: '🔧', themeColor: 'slate', keyword: 'Mesin & Manufaktur'
  },
  'Teknik Lingkungan': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Menyelesaikan masalah lingkungan melalui teknologi rekayasa berkelanjutan.',
    fullDescription: 'Teknik Lingkungan mempelajari cara menangani masalah lingkungan seperti pengolahan air, pengelolaan limbah, dan pengendalian polusi.',
    subjects: ['Kualitas Air', 'Pengolahan Limbah', 'Analisis Lingkungan', 'Pengendalian Polusi', 'AMDAL', 'Sanitasi'],
    emoji: '🌿', themeColor: 'green', keyword: 'Lingkungan & Keberlanjutan'
  },
  'Teknik Logistik': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengoptimalkan sistem logistik menggunakan pendekatan rekayasa dan teknologi.',
    fullDescription: 'Teknik Logistik menggabungkan ilmu teknik industri dengan manajemen logistik untuk merancang sistem rantai pasok yang efisien.',
    subjects: ['Sistem Logistik', 'Riset Operasional', 'Manajemen Inventori', 'Simulasi Logistik', 'TI Logistik', 'Supply Chain Analytics'],
    emoji: '📦', themeColor: 'orange', keyword: 'Sistem & Pasokan'
  },
  'Manajemen Rekayasa': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Menggabungkan ilmu teknik dengan manajemen bisnis untuk kepemimpinan industri.',
    fullDescription: 'Manajemen Rekayasa mempersiapkan lulusan untuk memimpin proyek teknis dengan kemampuan manajerial yang kuat.',
    subjects: ['Manajemen Proyek', 'Ekonomi Teknik', 'Rekayasa Sistem', 'Manajemen Operasional', 'Kepemimpinan Teknik', 'Inovasi Bisnis'],
    emoji: '📋', themeColor: 'blue', keyword: 'Teknik & Manajemen'
  },
  'Teknik Fisika': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Menerapkan prinsip fisika untuk memecahkan masalah rekayasa industri.',
    fullDescription: 'Teknik Fisika mengintegrasikan fisika terapan dengan instrumentasi, kontrol, dan sistem energi untuk solusi industri modern.',
    subjects: ['Fisika Terapan', 'Instrumentasi', 'Kontrol Proses', 'Termodinamika', 'Optika', 'Sistem Energi'],
    emoji: '⚗️', themeColor: 'purple', keyword: 'Fisika & Rekayasa'
  },
  'Teknik Geodesi': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengukur dan memetakan permukaan bumi untuk berbagai keperluan teknik.',
    fullDescription: 'Teknik Geodesi mempelajari pengukuran dan pemetaan bumi menggunakan teknologi GPS, remote sensing, dan sistem informasi geografis.',
    subjects: ['Geodesi', 'GIS', 'Remote Sensing', 'Kartografi', 'Fotogrametri', 'Survei Rekayasa'],
    emoji: '🗺️', themeColor: 'teal', keyword: 'Pemetaan & Geospasial'
  },
  'Teknik Geomatika': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengintegrasikan teknologi geospasial untuk pengelolaan informasi kebumian.',
    fullDescription: 'Teknik Geomatika adalah ilmu gabungan geodesi, GIS, dan remote sensing yang digunakan untuk mendukung perencanaan wilayah dan pembangunan infrastruktur.',
    subjects: ['Geomatika', 'Sistem Informasi Geografis', 'Penginderaan Jauh', 'Pemrograman GIS', 'Analisis Spasial', 'Pengukuran Kadastral'],
    emoji: '🛰️', themeColor: 'teal', keyword: 'Data Kebumian & Spasial'
  },
  // ── Arsitektur ───────────────────────────────────────────────────────────
  'Arsitektur': {
    degree: 'S.Ars.', group: 'Saintek', prospect: 'Luas',
    description: 'Merancang bangunan dan ruang yang fungsional, estetis, dan berkelanjutan.',
    fullDescription: 'Arsitektur mempelajari seni dan ilmu perancangan bangunan mulai dari konsep desain, struktur konstruksi, hingga aspek lingkungan dan sosial.',
    subjects: ['Desain Arsitektur', 'Struktur Bangunan', 'Teknologi Konstruksi', 'Sejarah Arsitektur', 'Fisika Bangunan', 'BIM/CAD'],
    emoji: '🏛️', themeColor: 'orange', keyword: 'Desain & Ruang'
  },
  'Arsitektur Interior': {
    degree: 'S.Ars.', group: 'Saintek', prospect: 'Luas',
    description: 'Merancang interior ruang yang estetis, fungsional, dan manusiawi.',
    fullDescription: 'Arsitektur Interior berfokus pada perancangan ruang dalam bangunan dengan mempertimbangkan estetika, fungsi, kenyamanan, dan kebutuhan pengguna.',
    subjects: ['Desain Interior', 'Material Interior', 'Pencahayaan Ruang', 'Perabot & Dekorasi', 'Gambar Teknik', 'CAD/BIM'],
    emoji: '🛋️', themeColor: 'pink', keyword: 'Estetika & Fungsional'
  },
  'Arsitektur Lanskap': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Baik',
    description: 'Merancang ruang luar dan lanskap yang harmonis dengan alam dan kebutuhan manusia.',
    fullDescription: 'Arsitektur Lanskap mempelajari perancangan ruang terbuka, taman, dan kawasan hijau perkotaan dan perdesaan.',
    subjects: ['Desain Lanskap', 'Ekologi Lansekap', 'Tanaman & Hortikultura', 'Konstruksi Lanskap', 'Perencanaan Hijau', 'GIS Lanskap'],
    emoji: '🌳', themeColor: 'green', keyword: 'Alam & Desain'
  },
  'PWK': {
    degree: 'S.T.', group: 'Saintek', prospect: 'Luas',
    description: 'Merencanakan tata ruang wilayah dan kota yang berkelanjutan dan manusiawi.',
    fullDescription: 'Perencanaan Wilayah dan Kota (PWK) mempelajari cara merancang dan mengelola ruang perkotaan dan perdesaan secara terintegrasi.',
    subjects: ['Tata Guna Lahan', 'Perencanaan Transportasi', 'Sistem Informasi Geografis', 'Studi Kawasan', 'Kebijakan Publik', 'Perumahan'],
    emoji: '🏙️', themeColor: 'teal', keyword: 'Wilayah & Kota'
  },
  'Desain Produk': {
    degree: 'S.Ds.', group: 'Saintek', prospect: 'Luas',
    description: 'Menciptakan produk yang fungsional, estetis, dan berpusat pada pengguna.',
    fullDescription: 'Desain Produk mempelajari proses kreatif merancang produk dari konsep hingga prototipe dengan mempertimbangkan estetika, ergonomi, dan kelayakan produksi.',
    subjects: ['Desain Produk Industri', 'Ergonomi', 'Material Produk', 'Proses Manufaktur', 'CAD', 'Riset Pengguna'],
    emoji: '🎨', themeColor: 'orange', keyword: 'Kreativitas & Fungsi'
  },
  // ── Kesehatan ────────────────────────────────────────────────────────────
  'Kedokteran': {
    degree: 'dr.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Mempelajari ilmu kedokteran untuk mendiagnosis, mengobati, dan mencegah penyakit.',
    fullDescription: 'Kedokteran mempersiapkan mahasiswa menjadi dokter dengan pengetahuan mendalam tentang anatomi, fisiologi, patologi, dan praktik klinik.',
    subjects: ['Anatomi', 'Fisiologi', 'Biokimia', 'Patologi', 'Farmakologi', 'Klinisi'],
    emoji: '🩺', themeColor: 'red', keyword: 'Ilmu & Kemanusiaan'
  },
  'Kedokteran Gigi': {
    degree: 'drg.', group: 'Saintek', prospect: 'Luas',
    description: 'Mempelajari kesehatan gigi dan mulut untuk meningkatkan kualitas hidup masyarakat.',
    fullDescription: 'Kedokteran Gigi mempelajari ilmu tentang gigi, jaringan pendukung, dan rongga mulut beserta cara pencegahan dan pengobatannya.',
    subjects: ['Anatomi Gigi', 'Konservasi Gigi', 'Ortodonti', 'Bedah Mulut', 'Periodontologi', 'Kedokteran Gigi Anak'],
    emoji: '🦷', themeColor: 'blue', keyword: 'Kesehatan Gigi & Mulut'
  },
  'Keperawatan': {
    degree: 'S.Kep.', group: 'Saintek', prospect: 'Sangat Luas',
    description: 'Memberikan asuhan keperawatan profesional untuk meningkatkan derajat kesehatan.',
    fullDescription: 'Keperawatan mempelajari ilmu dan seni merawat pasien secara holistik mencakup aspek fisik, psikologis, sosial, dan spiritual.',
    subjects: ['Keperawatan Dasar', 'Anatomi Fisiologi', 'Keperawatan Medikal Bedah', 'Keperawatan Jiwa', 'Gawat Darurat', 'Etika Keperawatan'],
    emoji: '🏥', themeColor: 'blue', keyword: 'Perawatan & Empati'
  },
  'Kebidanan': {
    degree: 'S.Tr.Keb.', group: 'Saintek', prospect: 'Luas',
    description: 'Memberikan pelayanan kesehatan ibu dan anak secara komprehensif.',
    fullDescription: 'Kebidanan mempelajari ilmu dan seni merawat ibu hamil, bersalin, dan nifas serta bayi baru lahir.',
    subjects: ['Asuhan Kebidanan', 'Kesehatan Reproduksi', 'Neonatus', 'KB & Kontrasepsi', 'Gizi Ibu & Anak', 'Patologi Kebidanan'],
    emoji: '👶', themeColor: 'pink', keyword: 'Ibu & Anak'
  },
  'Farmasi': {
    degree: 'S.Farm.', group: 'Saintek', prospect: 'Luas',
    description: 'Mempelajari ilmu obat-obatan dari penemuan hingga penggunaan klinis.',
    fullDescription: 'Farmasi mempelajari komposisi, pembuatan, kualitas, efek, dan penggunaan obat-obatan untuk pengobatan dan pencegahan penyakit.',
    subjects: ['Kimia Farmasi', 'Farmakologi', 'Farmasi Klinis', 'Teknologi Sediaan', 'Biologi Molekuler', 'Manajemen Farmasi'],
    emoji: '💊', themeColor: 'green', keyword: 'Ilmu Obat & Kesehatan'
  },
  'Fisioterapi': {
    degree: 'S.Ft.', group: 'Saintek', prospect: 'Luas',
    description: 'Membantu pemulihan fungsi gerak dan kualitas hidup pasien melalui terapi fisik.',
    fullDescription: 'Fisioterapi mempelajari teknik rehabilitasi untuk memulihkan dan meningkatkan fungsi gerak tubuh yang terganggu akibat penyakit atau cedera.',
    subjects: ['Anatomi & Kinesiologi', 'Patologi Klinis', 'Elektroterapi', 'Terapi Manual', 'Neurologi Fisioterapi', 'Fisioterapi Olahraga'],
    emoji: '💪', themeColor: 'orange', keyword: 'Gerak & Pemulihan'
  },
  'Gizi': {
    degree: 'S.Gz.', group: 'Saintek', prospect: 'Luas',
    description: 'Mempelajari ilmu nutrisi untuk meningkatkan status gizi individu dan masyarakat.',
    fullDescription: 'Gizi mempelajari zat gizi makanan, metabolisme tubuh, dan hubungannya dengan kesehatan, serta penerapannya dalam intervensi gizi.',
    subjects: ['Ilmu Gizi Dasar', 'Biokimia Gizi', 'Gizi Klinik', 'Gizi Masyarakat', 'Teknologi Pangan', 'Konseling Gizi'],
    emoji: '🥗', themeColor: 'green', keyword: 'Nutrisi & Kesehatan'
  },
  'Kesehatan Masyarakat': {
    degree: 'S.KM.', group: 'Saintek', prospect: 'Luas',
    description: 'Meningkatkan kesehatan populasi melalui pendekatan preventif dan promosi kesehatan.',
    fullDescription: 'Kesehatan Masyarakat berfokus pada pencegahan penyakit dan peningkatan kesehatan masyarakat melalui kebijakan, epidemiologi, dan promosi kesehatan.',
    subjects: ['Epidemiologi', 'Biostatistik', 'Kesehatan Lingkungan', 'Promosi Kesehatan', 'Kebijakan Kesehatan', 'Gizi Masyarakat'],
    emoji: '🌍', themeColor: 'green', keyword: 'Kesehatan & Masyarakat'
  },
  'Keselamatan dan Kesehatan Kerja (K3)': {
    degree: 'S.KM.', group: 'Saintek', prospect: 'Luas',
    description: 'Mencegah kecelakaan kerja dan penyakit akibat kerja di berbagai industri.',
    fullDescription: 'K3 mempelajari identifikasi, penilaian, dan pengendalian bahaya di tempat kerja untuk menciptakan lingkungan kerja yang aman dan sehat.',
    subjects: ['Keselamatan Kerja', 'Higiene Industri', 'Toksikologi Industri', 'Ergonomi', 'Manajemen K3', 'Regulasi K3'],
    emoji: '⛑️', themeColor: 'orange', keyword: 'Keselamatan & Kesehatan'
  },
  'Administrasi Rumah Sakit': {
    degree: 'S.KM.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengelola operasional rumah sakit dan fasilitas kesehatan secara profesional.',
    fullDescription: 'Administrasi Rumah Sakit mempelajari manajemen dan administrasi fasilitas kesehatan termasuk keuangan, SDM, dan layanan klinis.',
    subjects: ['Manajemen RS', 'Keuangan RS', 'Hukum Kesehatan', 'Rekam Medis', 'Mutu Layanan Kesehatan', 'Akreditasi RS'],
    emoji: '🏨', themeColor: 'blue', keyword: 'Manajemen Kesehatan'
  },
  'Sistem Informasi Kesehatan': {
    degree: 'S.KM.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengelola data dan informasi kesehatan dengan teknologi untuk layanan kesehatan yang optimal.',
    fullDescription: 'Sistem Informasi Kesehatan mengintegrasikan ilmu kesehatan dan teknologi informasi untuk mengelola data klinis dan mendukung pengambilan keputusan.',
    subjects: ['Rekam Medis', 'Sistem Informasi RS', 'Coding Diagnosis', 'Keamanan Data Kesehatan', 'Epidemiologi Klinik', 'Manajemen Informasi'],
    emoji: '🗂️', themeColor: 'teal', keyword: 'Data & Layanan Kesehatan'
  },
  // ── Kreatif & Seni ───────────────────────────────────────────────────────
  'DKV': {
    degree: 'S.Ds.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengkomunikasikan pesan melalui karya visual yang menarik dan bermakna.',
    fullDescription: 'Desain Komunikasi Visual (DKV) mempelajari perancangan komunikasi visual untuk berbagai media seperti iklan, branding, ilustrasi, dan media digital.',
    subjects: ['Tipografi', 'Desain Grafis', 'Branding', 'Ilustrasi', 'Motion Graphic', 'UI/UX Design'],
    emoji: '🖌️', themeColor: 'pink', keyword: 'Visual & Komunikasi'
  },
  'Seni Rupa': {
    degree: 'S.Sn.', group: 'Soshum', prospect: 'Baik',
    description: 'Mengekspresikan kreativitas melalui berbagai media dan teknik seni rupa.',
    fullDescription: 'Seni Rupa mempelajari berbagai cabang seni visual seperti lukis, patung, grafis, dan seni instalasi dengan landasan estetika dan budaya.',
    subjects: ['Melukis', 'Seni Patung', 'Seni Grafis', 'Estetika', 'Sejarah Seni', 'Kritik Seni'],
    emoji: '🎭', themeColor: 'pink', keyword: 'Ekspresi & Kreasi'
  },
  'Multimedia': {
    degree: 'S.Ds.', group: 'Saintek', prospect: 'Luas',
    description: 'Mengintegrasikan teks, gambar, audio, dan video untuk komunikasi digital kreatif.',
    fullDescription: 'Multimedia mempelajari perancangan dan produksi konten digital yang mengintegrasikan berbagai media untuk aplikasi hiburan, pendidikan, dan bisnis.',
    subjects: ['Produksi Video', 'Animasi 2D/3D', 'Audio Design', 'Game Design', 'Interaktif Media', 'Desain Web'],
    emoji: '🎬', themeColor: 'purple', keyword: 'Kreasi & Teknologi'
  },
  'Film': {
    degree: 'S.Sn.', group: 'Soshum', prospect: 'Baik',
    description: 'Mempelajari seni dan teknik pembuatan film dari konsep hingga distribusi.',
    fullDescription: 'Film mempelajari seluruh proses produksi film termasuk penulisan naskah, sinematografi, penyutradaraan, penyuntingan, dan distribusi.',
    subjects: ['Sinematografi', 'Penyutradaraan', 'Penyuntingan Film', 'Tata Suara', 'Penulisan Naskah', 'Sejarah Film'],
    emoji: '🎥', themeColor: 'red', keyword: 'Sinema & Narasi'
  },
  'Fotografi': {
    degree: 'S.Sn.', group: 'Soshum', prospect: 'Baik',
    description: 'Menguasai seni dan teknik fotografi untuk berbagai kebutuhan komersial dan artistik.',
    fullDescription: 'Fotografi mempelajari teknik pengambilan gambar, komposisi visual, dan pengolahan foto untuk berbagai keperluan jurnalistik, komersial, dan artistik.',
    subjects: ['Teknik Fotografi', 'Komposisi Visual', 'Fotografi Produk', 'Photojournalism', 'Pengolahan Digital', 'Fotografi Kreatif'],
    emoji: '📸', themeColor: 'slate', keyword: 'Visual & Cahaya'
  },
  // ── Pendidikan ───────────────────────────────────────────────────────────
  'Pendidikan': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempersiapkan calon pendidik profesional yang kompeten dan berdedikasi.',
    fullDescription: 'Program Pendidikan mempersiapkan mahasiswa menjadi guru profesional dengan penguasaan pedagogi, psikologi pendidikan, dan bidang studi.',
    subjects: ['Pedagogik', 'Psikologi Pendidikan', 'Kurikulum & Pembelajaran', 'Evaluasi Pendidikan', 'Microteaching', 'Teknologi Pendidikan'],
    emoji: '🎓', themeColor: 'green', keyword: 'Mendidik & Menginspirasi'
  },
  'Pendidikan Anak Usia Dini': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Mengembangkan potensi anak usia dini melalui pendidikan holistik dan bermain.',
    fullDescription: 'Pendidikan Anak Usia Dini (PAUD) mempelajari perkembangan dan pendidikan anak usia 0-6 tahun melalui pendekatan bermain sambil belajar.',
    subjects: ['Perkembangan Anak', 'Pendidikan PAUD', 'Media Pembelajaran AUD', 'Psikologi Anak', 'Seni untuk AUD', 'Manajemen PAUD'],
    emoji: '🧒', themeColor: 'yellow', keyword: 'Tumbuh Kembang Anak'
  },
  'Pendidikan Khusus': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Mendidik anak berkebutuhan khusus dengan pendekatan yang inklusif dan penuh kasih.',
    fullDescription: 'Pendidikan Khusus mempersiapkan tenaga pendidik untuk menangani anak berkebutuhan khusus (ABK) dengan berbagai metode dan media adaptif.',
    subjects: ['Pendidikan Inklusif', 'Asesmen ABK', 'Metode Pembelajaran Khusus', 'Psikologi ABK', 'Terapi Perilaku', 'Manajemen Kelas Inklusif'],
    emoji: '💙', themeColor: 'blue', keyword: 'Inklusif & Berempati'
  },
  'Bimbingan Konseling': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Membantu individu mengembangkan potensi dan mengatasi masalah melalui konseling profesional.',
    fullDescription: 'Bimbingan Konseling (BK) mempersiapkan konselor profesional yang mampu membantu individu dalam pengembangan diri dan pemecahan masalah.',
    subjects: ['Teori Konseling', 'Teknik Konseling', 'Bimbingan Karier', 'Psikologi Konseling', 'Asesmen', 'Etika Konseling'],
    emoji: '🤝', themeColor: 'purple', keyword: 'Empati & Bimbingan'
  },
  'PGSD': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempersiapkan guru sekolah dasar yang kompeten, kreatif, dan berkarakter.',
    fullDescription: 'Pendidikan Guru Sekolah Dasar (PGSD) mempersiapkan guru yang mampu mengajar semua mata pelajaran di tingkat sekolah dasar secara efektif.',
    subjects: ['Pembelajaran SD', 'Matematika SD', 'IPA SD', 'Bahasa Indonesia SD', 'IPS SD', 'PKn SD'],
    emoji: '📒', themeColor: 'green', keyword: 'Dasar Pendidikan'
  },
  'Pendidikan Teknik': {
    degree: 'S.Pd.T.', group: 'Saintek', prospect: 'Baik',
    description: 'Mempersiapkan guru teknik yang kompeten di bidang rekayasa dan vokasi.',
    fullDescription: 'Pendidikan Teknik mempersiapkan calon guru yang mampu mengajarkan ilmu teknik di sekolah menengah kejuruan (SMK) dan lembaga vokasi.',
    subjects: ['Pedagogi Vokasional', 'Teknik Dasar', 'Kurikulum Vokasi', 'Praktik Industri', 'Media Pembelajaran Teknik', 'Microteaching'],
    emoji: '🔩', themeColor: 'orange', keyword: 'Teknik & Mengajar'
  },
  'Pendidikan Vokasi': {
    degree: 'S.Pd.', group: 'Saintek', prospect: 'Baik',
    description: 'Mengembangkan pendidikan kejuruan untuk menyiapkan tenaga terampil siap kerja.',
    fullDescription: 'Pendidikan Vokasi mempersiapkan pendidik dan pengembang program vokasi yang berorientasi pada keterampilan praktis dan kebutuhan industri.',
    subjects: ['Kurikulum Vokasi', 'Metodologi Pengajaran Vokasi', 'Manajemen Sekolah Kejuruan', 'Praktik Industri', 'Pengembangan Modul', 'Asesmen Vokasi'],
    emoji: '🛠️', themeColor: 'teal', keyword: 'Vokasi & Industri'
  },
  'Pendidikan IPA': {
    degree: 'S.Pd.', group: 'Saintek', prospect: 'Baik',
    description: 'Mendidik siswa memahami ilmu pengetahuan alam melalui eksperimen dan inkuiri.',
    fullDescription: 'Pendidikan IPA mempersiapkan guru yang mampu mengajarkan sains secara menyenangkan, kontekstual, dan berbasis eksperimen.',
    subjects: ['IPA Terpadu', 'Metodologi Mengajar Sains', 'Fisika', 'Kimia', 'Biologi', 'Laboratorium IPA'],
    emoji: '🔭', themeColor: 'blue', keyword: 'Sains & Eksplorasi'
  },
  'Pendidikan Biologi': {
    degree: 'S.Pd.', group: 'Saintek', prospect: 'Baik',
    description: 'Mengajarkan ilmu biologi secara kontekstual dan berbasis penelitian.',
    fullDescription: 'Pendidikan Biologi mempersiapkan guru biologi yang kompeten mengajarkan ilmu kehidupan mulai dari tingkat molekuler hingga ekosistem.',
    subjects: ['Biologi Sel & Molekuler', 'Ekologi', 'Fisiologi', 'Genetika', 'Metodologi Mengajar Biologi', 'Laboratorium Biologi'],
    emoji: '🧬', themeColor: 'green', keyword: 'Biologi & Kehidupan'
  },
  'Pendidikan Fisika': {
    degree: 'S.Pd.', group: 'Saintek', prospect: 'Baik',
    description: 'Mengajarkan fisika secara inkuiri dan berbasis fenomena nyata.',
    fullDescription: 'Pendidikan Fisika mempersiapkan guru yang mampu mengajarkan konsep fisika secara kontekstual, eksperimental, dan menyenangkan.',
    subjects: ['Fisika Umum', 'Mekanika', 'Listrik-Magnet', 'Termodinamika', 'Optika', 'Metodologi Mengajar Fisika'],
    emoji: '🌌', themeColor: 'indigo', keyword: 'Fisika & Alam Semesta'
  },
  'Pendidikan Bahasa': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Baik',
    description: 'Mempersiapkan guru bahasa yang kompeten dalam mengajarkan bahasa secara efektif.',
    fullDescription: 'Pendidikan Bahasa mempersiapkan mahasiswa menjadi guru bahasa yang profesional dan inovatif dengan pendekatan komunikatif.',
    subjects: ['Linguistik Terapan', 'Metodologi Pengajaran Bahasa', 'Kurikulum Bahasa', 'Evaluasi Pembelajaran', 'Microteaching', 'Sastra untuk Pendidikan'],
    emoji: '🗣️', themeColor: 'purple', keyword: 'Bahasa & Pengajaran'
  },
  'Pendidikan Bahasa Inggris': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempersiapkan guru bahasa Inggris yang komunikatif dan inovatif.',
    fullDescription: 'Pendidikan Bahasa Inggris mempelajari linguistik, sastra Inggris, dan pedagogik untuk mempersiapkan guru bahasa Inggris yang kompeten.',
    subjects: ['Linguistics', 'English Literature', 'Teaching Methodology', 'Language Assessment', 'TEFL/TESOL', 'Cross-Cultural Communication'],
    emoji: '🇬🇧', themeColor: 'blue', keyword: 'Bahasa Inggris & Pengajaran'
  },
  // ── Sosial & Humaniora ───────────────────────────────────────────────────
  'Psikologi': {
    degree: 'S.Psi.', group: 'Soshum', prospect: 'Sangat Luas',
    description: 'Mempelajari perilaku dan proses mental manusia untuk membantu kesejahteraan individu.',
    fullDescription: 'Psikologi adalah ilmu tentang perilaku dan proses mental manusia. Mahasiswa mempelajari berbagai pendekatan untuk memahami manusia dalam konteks individu, sosial, dan klinis.',
    subjects: ['Psikologi Umum', 'Psikologi Perkembangan', 'Psikologi Klinis', 'Psikologi IO', 'Asesmen Psikologi', 'Konseling'],
    emoji: '🧠', themeColor: 'purple', keyword: 'Perilaku & Mental'
  },
  'Ilmu Hukum': {
    degree: 'S.H.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempelajari sistem hukum dan keadilan untuk menegakkan hak dan kewajiban.',
    fullDescription: 'Ilmu Hukum mempelajari norma, peraturan, dan sistem peradilan yang mengatur kehidupan bermasyarakat dan bernegara.',
    subjects: ['Hukum Perdata', 'Hukum Pidana', 'Hukum Tata Negara', 'Hukum Internasional', 'Hukum Bisnis', 'Hukum Acara'],
    emoji: '⚖️', themeColor: 'indigo', keyword: 'Hukum & Keadilan'
  },
  'Ilmu Komunikasi': {
    degree: 'S.I.Kom.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempelajari proses komunikasi manusia dalam berbagai konteks dan media.',
    fullDescription: 'Ilmu Komunikasi mempelajari teori dan praktik komunikasi dalam konteks interpersonal, media massa, public relations, dan komunikasi digital.',
    subjects: ['Teori Komunikasi', 'Jurnalistik', 'Public Relations', 'Komunikasi Pemasaran', 'Media Digital', 'Riset Komunikasi'],
    emoji: '📢', themeColor: 'orange', keyword: 'Media & Pesan'
  },
  'Hubungan Internasional': {
    degree: 'S.Hub.Int.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempelajari dinamika politik, ekonomi, dan sosial antar negara di tingkat global.',
    fullDescription: 'Hubungan Internasional mempelajari interaksi antar negara, organisasi internasional, dan aktor non-negara dalam sistem global.',
    subjects: ['Teori HI', 'Diplomasi', 'Hukum Internasional', 'Ekonomi Politik Internasional', 'Studi Kawasan', 'Keamanan Internasional'],
    emoji: '🌐', themeColor: 'blue', keyword: 'Global & Diplomasi'
  },
  'Ilmu Politik': {
    degree: 'S.IP.', group: 'Soshum', prospect: 'Luas',
    description: 'Menganalisis sistem politik, kebijakan, dan dinamika kekuasaan dalam masyarakat.',
    fullDescription: 'Ilmu Politik mempelajari teori politik, sistem pemerintahan, kebijakan publik, dan relasi kekuasaan dalam masyarakat dan negara.',
    subjects: ['Teori Politik', 'Sistem Politik Komparatif', 'Kebijakan Publik', 'Partai Politik', 'Pemilu & Demokrasi', 'Politik Internasional'],
    emoji: '🗳️', themeColor: 'red', keyword: 'Kekuasaan & Demokrasi'
  },
  'Kriminologi': {
    degree: 'S.Sos.', group: 'Soshum', prospect: 'Baik',
    description: 'Mempelajari kejahatan dan perilaku kriminal dari perspektif sosial dan ilmiah.',
    fullDescription: 'Kriminologi mengkaji penyebab, pola, dan akibat kejahatan serta respons masyarakat dan sistem peradilan terhadap kejahatan.',
    subjects: ['Teori Kriminologi', 'Viktimologi', 'Kriminalistik', 'Hukum Pidana', 'Sistem Peradilan Pidana', 'Sosiologi Kejahatan'],
    emoji: '🔍', themeColor: 'slate', keyword: 'Kejahatan & Keadilan'
  },
  'Kebijakan Publik': {
    degree: 'S.A.P.', group: 'Soshum', prospect: 'Luas',
    description: 'Menganalisis dan merancang kebijakan untuk menyelesaikan masalah publik secara efektif.',
    fullDescription: 'Kebijakan Publik mempelajari proses perumusan, implementasi, dan evaluasi kebijakan pemerintah untuk kepentingan masyarakat.',
    subjects: ['Analisis Kebijakan', 'Ekonomi Kebijakan Publik', 'Metode Riset Kebijakan', 'Manajemen Publik', 'Evaluasi Program', 'Anggaran Publik'],
    emoji: '📜', themeColor: 'teal', keyword: 'Kebijakan & Dampak'
  },
  // ── Bisnis & Ekonomi ─────────────────────────────────────────────────────
  'Manajemen': {
    degree: 'S.Mn.', group: 'Soshum', prospect: 'Sangat Luas',
    description: 'Mempelajari cara mengelola sumber daya organisasi untuk mencapai tujuan bisnis.',
    fullDescription: 'Manajemen mempelajari teori dan praktik perencanaan, pengorganisasian, pengarahan, dan pengendalian organisasi bisnis.',
    subjects: ['Manajemen Strategik', 'Manajemen SDM', 'Manajemen Keuangan', 'Pemasaran', 'Kewirausahaan', 'Perilaku Organisasi'],
    emoji: '📊', themeColor: 'blue', keyword: 'Kepemimpinan & Bisnis'
  },
  'Akuntansi': {
    degree: 'S.Ak.', group: 'Soshum', prospect: 'Sangat Luas',
    description: 'Mempelajari pencatatan, analisis, dan pelaporan keuangan untuk pengambilan keputusan.',
    fullDescription: 'Akuntansi mempelajari sistem pencatatan keuangan, audit, perpajakan, dan analisis laporan keuangan yang dibutuhkan di semua sektor.',
    subjects: ['Akuntansi Keuangan', 'Akuntansi Manajemen', 'Auditing', 'Perpajakan', 'SIA', 'Akuntansi Publik'],
    emoji: '📑', themeColor: 'green', keyword: 'Keuangan & Akuntabilitas'
  },
  'Keuangan': {
    degree: 'S.E.', group: 'Soshum', prospect: 'Sangat Luas',
    description: 'Mempelajari pengelolaan aset, investasi, dan keputusan keuangan strategis.',
    fullDescription: 'Keuangan mempelajari teori dan praktik manajemen keuangan, investasi, pasar modal, dan pengambilan keputusan finansial.',
    subjects: ['Manajemen Investasi', 'Pasar Modal', 'Manajemen Risiko', 'Analisis Keuangan', 'Keuangan Internasional', 'Derivatives'],
    emoji: '💰', themeColor: 'green', keyword: 'Investasi & Keuangan'
  },
  'Bisnis Digital': {
    degree: 'S.E.', group: 'Soshum', prospect: 'Sangat Luas',
    description: 'Menggabungkan strategi bisnis dengan teknologi digital untuk era ekonomi baru.',
    fullDescription: 'Bisnis Digital mempelajari bagaimana memanfaatkan teknologi untuk transformasi bisnis, e-commerce, pemasaran digital, dan model bisnis inovatif.',
    subjects: ['E-Commerce', 'Digital Marketing', 'Business Analytics', 'Startup Ecosystem', 'Platform Business', 'UI/UX untuk Bisnis'],
    emoji: '📱', themeColor: 'indigo', keyword: 'Digital & Inovasi'
  },
  'Administrasi Bisnis': {
    degree: 'S.A.B.', group: 'Soshum', prospect: 'Luas',
    description: 'Mengelola dan mengembangkan organisasi bisnis secara profesional dan strategis.',
    fullDescription: 'Administrasi Bisnis mempelajari prinsip-prinsip pengelolaan bisnis mulai dari operasional, pemasaran, keuangan, hingga SDM.',
    subjects: ['Pengantar Bisnis', 'Manajemen Operasional', 'Perilaku Organisasi', 'Strategi Bisnis', 'Manajemen SDM', 'Akuntansi Manajemen'],
    emoji: '💼', themeColor: 'blue', keyword: 'Organisasi & Strategi'
  },
  'Manajemen SDM': {
    degree: 'S.E.', group: 'Soshum', prospect: 'Luas',
    description: 'Mengelola dan mengembangkan sumber daya manusia sebagai aset utama organisasi.',
    fullDescription: 'Manajemen SDM mempelajari strategi dan praktik pengelolaan SDM mulai dari rekrutmen, pelatihan, hingga pengembangan karier.',
    subjects: ['Manajemen SDM Strategik', 'Rekrutmen & Seleksi', 'Pelatihan & Pengembangan', 'Kompensasi & Benefit', 'Hubungan Industrial', 'Psikologi Organisasi'],
    emoji: '👥', themeColor: 'teal', keyword: 'Manusia & Organisasi'
  },
  'Ekonomi Pembangunan': {
    degree: 'S.E.', group: 'Soshum', prospect: 'Luas',
    description: 'Menganalisis dan merancang strategi pembangunan ekonomi yang inklusif dan berkelanjutan.',
    fullDescription: 'Ekonomi Pembangunan mempelajari teori dan kebijakan yang mendorong pertumbuhan ekonomi, pengentasan kemiskinan, dan pembangunan berkelanjutan.',
    subjects: ['Ekonomi Makro', 'Ekonomi Mikro', 'Ekonometrika', 'Ekonomi Pembangunan', 'Kebijakan Fiskal', 'Ekonomi Regional'],
    emoji: '📈', themeColor: 'green', keyword: 'Pembangunan & Ekonomi'
  },
  'Logistik': {
    degree: 'S.T.', group: 'Soshum', prospect: 'Luas',
    description: 'Mengelola aliran barang, informasi, dan sumber daya dalam rantai pasokan global.',
    fullDescription: 'Logistik mempelajari manajemen rantai pasokan, distribusi, transportasi, dan pergudangan untuk efisiensi aliran produk.',
    subjects: ['Supply Chain Management', 'Manajemen Transportasi', 'Pergudangan', 'Logistik Internasional', 'Procurement', 'Optimasi Distribusi'],
    emoji: '🚚', themeColor: 'orange', keyword: 'Rantai Pasok & Distribusi'
  },
  'Perpajakan': {
    degree: 'S.Tr.Ak.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempelajari regulasi perpajakan untuk konsultasi dan perencanaan pajak profesional.',
    fullDescription: 'Perpajakan mempelajari hukum pajak, akuntansi pajak, dan teknik perencanaan pajak yang dibutuhkan di sektor swasta dan pemerintah.',
    subjects: ['Hukum Pajak', 'Akuntansi Pajak', 'Pajak Penghasilan', 'PPN & PPNBM', 'Perpajakan Internasional', 'Audit Pajak'],
    emoji: '🧾', themeColor: 'green', keyword: 'Pajak & Regulasi'
  },
  // ── Komunikasi & Bahasa ──────────────────────────────────────────────────
  'Sastra Inggris': {
    degree: 'S.S.', group: 'Soshum', prospect: 'Baik',
    description: 'Mendalami bahasa, sastra, dan budaya Inggris untuk komunikasi global yang efektif.',
    fullDescription: 'Sastra Inggris mempelajari bahasa Inggris secara mendalam meliputi linguistik, kesusastraan, penerjemahan, dan komunikasi lintas budaya.',
    subjects: ['Linguistik', 'Sastra Inggris', 'Penerjemahan', 'Keterampilan Menulis', 'Pragmatik', 'Budaya Anglo-Amerika'],
    emoji: '📚', themeColor: 'purple', keyword: 'Bahasa & Budaya'
  },
  'Linguistik': {
    degree: 'S.Hum.', group: 'Soshum', prospect: 'Baik',
    description: 'Mengkaji struktur, sejarah, dan fungsi bahasa manusia secara ilmiah.',
    fullDescription: 'Linguistik mempelajari bahasa sebagai sistem yang mencakup fonologi, morfologi, sintaksis, semantik, dan pragmatik secara ilmiah.',
    subjects: ['Fonologi', 'Morfologi', 'Sintaksis', 'Semantik', 'Pragmatik', 'Sosiolinguistik'],
    emoji: '🔤', themeColor: 'purple', keyword: 'Bahasa & Makna'
  },
  'Public Relations': {
    degree: 'S.I.Kom.', group: 'Soshum', prospect: 'Luas',
    description: 'Mengelola citra dan komunikasi organisasi dengan publik dan media secara strategis.',
    fullDescription: 'Public Relations mempelajari strategi membangun hubungan positif antara organisasi dengan berbagai pemangku kepentingan.',
    subjects: ['Manajemen PR', 'Media Relations', 'Crisis Communication', 'Event Management', 'Digital PR', 'Corporate Communication'],
    emoji: '📣', themeColor: 'orange', keyword: 'Relasi & Citra'
  },
  'Advertising': {
    degree: 'S.I.Kom.', group: 'Soshum', prospect: 'Luas',
    description: 'Merancang pesan iklan yang persuasif dan kreatif untuk mempengaruhi konsumen.',
    fullDescription: 'Advertising mempelajari strategi dan kreativitas dalam merancang kampanye iklan yang efektif di berbagai platform media.',
    subjects: ['Strategi Kreatif', 'Copywriting', 'Media Planning', 'Digital Advertising', 'Brand Communication', 'Riset Konsumen'],
    emoji: '📺', themeColor: 'red', keyword: 'Iklan & Persuasi'
  },
  'Manajemen Industri Kreatif': {
    degree: 'S.E.', group: 'Soshum', prospect: 'Luas',
    description: 'Mengelola bisnis industri kreatif mulai dari seni, hiburan, hingga media digital.',
    fullDescription: 'Manajemen Industri Kreatif mempersiapkan lulusan untuk mengelola dan mengembangkan bisnis di sektor kreatif yang terus berkembang.',
    subjects: ['Manajemen Bisnis Kreatif', 'Ekonomi Kreatif', 'Kekayaan Intelektual', 'Manajemen Acara', 'Bisnis Digital Kreatif', 'Pemasaran Kreatif'],
    emoji: '🎪', themeColor: 'pink', keyword: 'Kreativitas & Bisnis'
  },
  // ── Administrasi Publik ──────────────────────────────────────────────────
  'Administrasi Publik': {
    degree: 'S.A.P.', group: 'Soshum', prospect: 'Luas',
    description: 'Mempelajari pengelolaan kebijakan dan layanan publik yang efektif dan akuntabel.',
    fullDescription: 'Administrasi Publik mempelajari cara mengelola organisasi pemerintah dan sektor publik, termasuk perumusan dan implementasi kebijakan.',
    subjects: ['Kebijakan Publik', 'Manajemen Pemerintahan', 'Hukum Administrasi', 'Birokrasi', 'Otonomi Daerah', 'Pelayanan Publik'],
    emoji: '🏛️', themeColor: 'teal', keyword: 'Pemerintahan & Pelayanan'
  },
  // ── Aliases & Abbreviations ──────────────────────────────────────────────
  'BK': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Membantu individu mengembangkan potensi dan mengatasi masalah melalui konseling profesional.',
    fullDescription: 'Bimbingan Konseling (BK) mempersiapkan konselor profesional yang mampu membantu individu dalam pengembangan diri dan pemecahan masalah.',
    subjects: ['Teori Konseling', 'Teknik Konseling', 'Bimbingan Karier', 'Psikologi Konseling', 'Asesmen', 'Etika Konseling'],
    emoji: '🤝', themeColor: 'purple', keyword: 'Empati & Bimbingan'
  },
  'PAUD': {
    degree: 'S.Pd.', group: 'Soshum', prospect: 'Luas',
    description: 'Mengembangkan potensi anak usia dini melalui pendidikan holistik dan bermain.',
    fullDescription: 'PAUD mempelajari perkembangan dan pendidikan anak usia 0-6 tahun melalui pendekatan bermain sambil belajar.',
    subjects: ['Perkembangan Anak', 'Pendidikan PAUD', 'Media Pembelajaran AUD', 'Psikologi Anak', 'Seni untuk AUD', 'Manajemen PAUD'],
    emoji: '🧒', themeColor: 'yellow', keyword: 'Tumbuh Kembang Anak'
  },
}

// ─── Fuzzy lookup ─────────────────────────────────────────────────────────────
export const getMajorMeta = (majorName: string): MajorMeta => {
  if (MAJOR_META[majorName]) return MAJOR_META[majorName]

  const normalized = majorName.toLowerCase()
  const found = Object.entries(MAJOR_META).find(([key]) =>
    key.toLowerCase().includes(normalized) || normalized.includes(key.toLowerCase().replace(/^(teknik|ilmu|pendidikan)\s+/i, ''))
  )
  if (found) return found[1]

  const isSaintek = /teknik|komputer|sains|data|statistika|aktuaria|kedokteran|farmasi|gizi|kesehatan|arsitektur|fisika|kimia|biologi|informatika|sistem informasi/i.test(majorName)
  return {
    degree: isSaintek ? 'S.T.' : 'S.E.',
    group: isSaintek ? 'Saintek' : 'Soshum',
    prospect: 'Luas',
    description: `Program studi ${majorName} mempersiapkan mahasiswa dengan keahlian dan kompetensi profesional.`,
    fullDescription: `${majorName} adalah program studi yang membekali mahasiswa dengan pengetahuan dan keterampilan yang dibutuhkan di dunia kerja modern.`,
    subjects: ['Mata Kuliah Dasar', 'Teori & Praktik', 'Riset & Inovasi', 'Proyek Lapangan', 'Seminar', 'Tugas Akhir'],
    emoji: '🎓', themeColor: 'blue', keyword: 'Profesional & Kompeten'
  }
}
