'use client'

import React from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, BarChart2, Sparkles, Code, FlaskConical, Calculator, Trophy, Languages, Hash, Puzzle } from 'lucide-react'

const RIASEC_NAMES: Record<string, string> = {
  R: 'Realistic', I: 'Investigative', A: 'Artistic',
  S: 'Social', E: 'Enterprising', C: 'Conventional'
}

const TRAIT_DESC: Record<string, string> = {
  R: 'sisi realistik mendukung eksekusi praktis dan penyelesaian masalah secara langsung',
  I: 'memiliki kecenderungan tinggi untuk memecahkan masalah kompleks secara logis dan analitis',
  A: 'sifat artistikmu menunjukkan kreativitas dan inovasi dalam pendekatan solusi',
  S: 'jiwa sosialmu menonjolkan empati dan kemampuan membangun relasi yang baik',
  E: 'sisi enterprising memberimu dorongan kuat untuk memimpin dan memengaruhi orang lain',
  C: 'pendekatan konvensionalmu memastikan segalanya berjalan terstruktur, rapi, dan sistematis'
}

const MAJOR_RECOMMENDATIONS: Record<string, {name: string, icon: any}[]> = {
  I: [
    { name: 'Teknik Informatika', icon: Code },
    { name: 'Sistem Informasi', icon: FlaskConical },
    { name: 'Matematika', icon: Calculator }
  ],
  A: [
    { name: 'Desain Komunikasi Visual', icon: Sparkles },
    { name: 'Ilmu Komunikasi', icon: Languages },
    { name: 'Seni Rupa', icon: Puzzle }
  ],
  R: [
    { name: 'Teknik Mesin', icon: Puzzle },
    { name: 'Teknik Sipil', icon: BarChart2 },
    { name: 'Arsitektur', icon: Trophy }
  ],
  S: [
    { name: 'Psikologi', icon: Languages },
    { name: 'Pendidikan', icon: Trophy },
    { name: 'Keperawatan', icon: Sparkles }
  ],
  E: [
    { name: 'Manajemen Bisnis', icon: BarChart2 },
    { name: 'Ilmu Hukum', icon: Trophy },
    { name: 'Ilmu Politik', icon: Languages }
  ],
  C: [
    { name: 'Akuntansi', icon: Calculator },
    { name: 'Administrasi Bisnis', icon: BarChart2 },
    { name: 'Statistika', icon: Hash }
  ],
}

interface HasilAnalisisSectionProps {
  userName?: string
  riasecScores: Record<string, number>
  datScores: Record<string, number>
  riasecCode: string
  suggestedField: string
  funFact: string
  majors: string[]
}

export const HasilAnalisisSection = ({
  userName = 'Siswa',
  riasecScores,
  datScores,
  riasecCode,
  suggestedField,
  funFact,
  majors
}: HasilAnalisisSectionProps) => {
  const sortedTraits = Object.entries(riasecScores).sort((a, b) => b[1] - a[1])
  const top3 = sortedTraits.slice(0, 3)
  
  const verbalScore = datScores['Verbal'] || 0
  const numericScore = datScores['Numerical'] || 0
  const klarikalScore = datScores['Clerical'] || 0

  const getDatGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', label: 'Sangat Tinggi', color: 'text-[#22c55e]', bg: 'bg-[#f0fdf4]' }
    if (score >= 80) return { grade: 'A', label: 'Tinggi', color: 'text-[#22c55e]', bg: 'bg-[#f0fdf4]' }
    if (score >= 60) return { grade: 'B', label: 'Rata-rata', color: 'text-[#3b82f6]', bg: 'bg-[#eff6ff]' }
    if (score >= 40) return { grade: 'C', label: 'Kurang', color: 'text-[#f59e0b]', bg: 'bg-[#fffbeb]' }
    return { grade: 'D', label: 'Sangat Kurang', color: 'text-[#ef4444]', bg: 'bg-[#fef2f2]' }
  }

  const getRiasecColor = (index: number) => {
    if (index === 0) return 'bg-[#16a34a]' // Green
    if (index === 1) return 'bg-[#84cc16]' // Lime Green
    return 'bg-[#ca8a04]' // Yellow/Gold
  }

  const firstName = userName.split(' ')[0]
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const paragraphDesc = `Wah! Ternyata kamu ${TRAIT_DESC[top3[0]?.[0]] || ''}. ${
    top3[1] ? `Sifat ${RIASEC_NAMES[top3[1][0]]?.toLowerCase()}mu menunjukkan ${TRAIT_DESC[top3[1][0]].split('menunjukkan ')[1] || TRAIT_DESC[top3[1][0]]}, ` : ''
  }${top3[2] ? `sementara ${TRAIT_DESC[top3[2][0]]}. ` : ''}Kamu sangat cocok bekerja di lingkungan yang membutuhkan kedalaman intelektual dan kebebasan berekspresi.`

  const datCards = [
    { title: 'Verbal', score: verbalScore, icon: Languages, desc: 'Kemampuan mengolah kata dan komunikasi logis.' },
    { title: 'Numerik', score: numericScore, icon: Hash, desc: 'Kecakapan dalam menghitung dan data angka.' },
    { title: 'Klarikal', score: klarikalScore, icon: Puzzle, desc: 'Visualisasi pola dan logika non-verbal.' },
  ]

  const majorIcons = [Sparkles, Code, Calculator, Trophy, Languages, Puzzle]

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50/50">
      {/* Topbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 h-[72px] flex items-center justify-between px-8 shrink-0">
        <h1 className="text-[20px] font-bold text-[#0B3B60]">Hasil Analisis</h1>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#0B3B60] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <span className="text-sm font-medium text-[#0B3B60] hidden sm:block">{firstName}</span>
            <ChevronDown size={16} className="text-[#0B3B60]" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-[28px] font-bold text-[#0B3B60]">Hasil Analisis Profilmu</h2>
            <p className="text-slate-500 text-[15px]">Halo, {firstName}! Berikut adalah ringkasan potensi dan minat yang telah kami kembangkan untukmu.</p>
          </div>

          {/* Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left Card: RIASEC */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <BarChart2 className="text-[#0B3B60]" size={22} />
                  <h3 className="text-lg font-bold text-[#0B3B60]">Orientasi Minat (Holland RIASEC)</h3>
                </div>
                <button className="text-[#1a4b8c] font-medium text-[13px] hover:underline">Pelajari RIASEC</button>
              </div>

              <div className="space-y-6">
                {top3.map(([trait, score], index) => {
                  const pct = Math.round((score / 30) * 100)
                  const barColor = getRiasecColor(index)
                  return (
                    <div key={trait} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800 text-[15px]">{RIASEC_NAMES[trait]} ({trait})</span>
                        <span className="font-bold text-[16px] text-[#0B3B60]">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100/80 rounded-full h-3">
                        <div className={`${barColor} h-3 rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 bg-[#f8fafc] rounded-xl p-5 border border-slate-200">
                <p className="text-slate-600 leading-relaxed text-[14px]">
                  {paragraphDesc}
                </p>
              </div>
            </div>

            {/* Right Card: Majors */}
            <div className="lg:col-span-2 bg-[#0B3B60] rounded-xl shadow-md p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-white" size={22} />
                <h3 className="text-lg font-bold text-white">Kesimpulan Jurusan Terbaik</h3>
              </div>
              <p className="text-blue-100/80 text-[14px] mb-8 leading-relaxed">
                Berdasarkan profil psikologismu, berikut adalah {majors.length} rekomendasi jurusan paling potensial:
              </p>

              <div className="space-y-3 flex-1">
                {majors.map((major, i) => {
                  const Icon = majorIcons[i % majorIcons.length]
                  return (
                    <div key={i} className="flex items-center gap-4 bg-[#1a4b8c] hover:bg-[#1e5aa8] rounded-xl p-4 transition-colors cursor-pointer border border-[#235b9e]">
                      <div className="p-1.5">
                        <Icon className="text-white" size={20} />
                      </div>
                      <span className="font-semibold text-white text-[15px] line-clamp-1">{major}</span>
                    </div>
                  )
                })}
              </div>

              <Link href="/rekomendasi-jurusan" className="mt-8">
                <button className="w-full bg-white hover:bg-slate-50 text-[#0B3B60] font-bold py-3.5 text-[14px] rounded-xl transition-colors shadow-sm">
                  Lihat Rekomendasi Jurusan
                </button>
              </Link>
            </div>

          </div>

          {/* Bottom Section: DAT */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-3">
                <Trophy className="text-[#0B3B60]" size={22} />
                <h3 className="text-lg font-bold text-[#0B3B60]">Potensi Bakat (Differential Aptitude Test)</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded bg-transparent border border-[#22c55e] text-[#22c55e] text-[11px] font-bold uppercase tracking-wider">A+ SANGAT TINGGI</div>
                <div className="px-2.5 py-1 rounded bg-transparent border border-[#3b82f6] text-[#3b82f6] text-[11px] font-bold uppercase tracking-wider">B RATA-RATA</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {datCards.map((card, i) => {
                const gradeInfo = getDatGrade(card.score)
                return (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative flex flex-col">
                    <div className="flex justify-between items-start mb-5">
                      <div className="p-2.5 rounded-lg bg-[#eff6ff]">
                        <card.icon className="text-[#3b82f6]" size={24} strokeWidth={2} />
                      </div>
                      <span className="text-4xl font-black text-[#e2e8f0]">{gradeInfo.grade}</span>
                    </div>
                    
                    <h4 className="text-[17px] font-bold text-[#0B3B60] mb-2">{card.title}</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed flex-1 mb-6">
                      {card.desc}
                    </p>

                    <div className={`self-start px-3 py-1 rounded-[6px] ${gradeInfo.bg} ${gradeInfo.color} font-bold text-[12px]`}>
                      {gradeInfo.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
