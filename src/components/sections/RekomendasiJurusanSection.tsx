'use client'

import React from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, BookOpen, Compass, ChevronRight, Menu, TrendingUp } from 'lucide-react'
import { getCareerMeta } from '@/lib/constants/career-meta'

// Define props
interface RekomendasiJurusanSectionProps {
  userName?: string
  riasecCode: string
  suggestedField: string
  totalMajors: number
  topMajor: any
  otherMajors: any[]
  previewCareers: string[]
  sortedTraits: [string, number][]
  totalScore: number
}

// Add a mapping for "Prospek Karir Masa Depan"
const CAREER_PROSPECTS: Record<string, { desc: string, roles: { category: string, name: string, salary: string }[] }> = {
  'Saintek': {
    desc: 'Bidang Sains dan Teknologi memiliki pertumbuhan pasar kerja sebesar +15% per tahun. Lulusan dapat mengejar peran strategis berikut:',
    roles: [
      { category: 'HIGH DEMAND', name: 'AI Engineer', salary: 'Gaji rata-rata: 15-35 jt/bln' },
      { category: 'STABILITY', name: 'Cyber Security', salary: 'Gaji rata-rata: 12-30 jt/bln' },
      { category: 'VERSATILITY', name: 'Product Manager', salary: 'Gaji rata-rata: 18-40 jt/bln' }
    ]
  },
  'Soshum': {
    desc: 'Bidang Sosial dan Humaniora sangat dibutuhkan dalam manajemen modern dan komunikasi strategis. Lulusan dapat mengejar peran berikut:',
    roles: [
      { category: 'HIGH DEMAND', name: 'HR Director', salary: 'Gaji rata-rata: 15-30 jt/bln' },
      { category: 'STABILITY', name: 'Corporate Comms', salary: 'Gaji rata-rata: 10-25 jt/bln' },
      { category: 'VERSATILITY', name: 'Business Analyst', salary: 'Gaji rata-rata: 12-28 jt/bln' }
    ]
  }
}

export const RekomendasiJurusanSection = ({
  userName = 'Siswa',
  riasecCode,
  suggestedField,
  totalMajors,
  topMajor,
  otherMajors,
  previewCareers,
  sortedTraits,
  totalScore
}: RekomendasiJurusanSectionProps) => {
  const firstName = userName.split(' ')[0]
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const prospectDesc = suggestedField === 'Saintek' 
    ? 'Bidang Sains dan Teknologi memiliki pertumbuhan pasar kerja sebesar +15% per tahun. Lulusan dapat mengejar peran strategis berikut:'
    : 'Bidang Sosial dan Humaniora sangat dibutuhkan dalam manajemen modern dan komunikasi strategis. Lulusan dapat mengejar peran berikut:'

  const topCareers = previewCareers.slice(0, 3)
  const categoryLabels = ['HIGH DEMAND', 'STABILITY', 'VERSATILITY']

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50/50">
      {/* Topbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 h-[72px] flex items-center justify-between px-8 shrink-0">
        <h1 className="text-[20px] font-bold text-[#0B3B60]">Rekomendasi Jurusan</h1>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#1a4b8c] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <span className="text-sm font-medium text-[#0B3B60] hidden sm:block">{firstName}</span>
            <ChevronDown size={16} className="text-[#0B3B60]" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
          
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-[28px] font-bold text-[#0B3B60]">Jurusan yang Paling Cocok untukmu</h2>
            <p className="text-slate-500 text-[15px] max-w-2xl leading-relaxed">
              Berdasarkan hasil tes minat, bakat, dan kepribadianmu, kami menemukan beberapa bidang studi yang paling menonjol untuk masa depanmu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Featured Top Major */}
            <div className="lg:col-span-5 bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 flex flex-col items-center text-center">
              <div className="bg-[#fef9c3] text-[#a16207] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-10">
                Pilihan Teratas
              </div>
              
              {/* Circular Progress */}
              <div className="relative w-48 h-48 mb-8">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" stroke="#22c55e" strokeWidth="10" 
                    strokeLinecap="round" 
                    strokeDasharray={`${(topMajor.matchPercent / 100) * 283} 283`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[44px] font-black text-[#0B3B60] leading-none mb-1">{topMajor.matchPercent}%</span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Kecocokan</span>
                </div>
              </div>

              <h3 className="text-[26px] font-bold text-[#0B3B60] mb-4">{topMajor.major}</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-10 flex-1 px-4">
                Analisis datamu menunjukkan kemampuan logika matematis dan pemecahan masalah yang luar biasa tinggi.
              </p>

              <Link href={`/detail-jurusan?major=${encodeURIComponent(topMajor.major)}`} className="w-full">
                <button className="w-full bg-[#0B3B60] hover:bg-[#082a45] text-white font-bold py-4 rounded-xl transition-all active:scale-95 text-[15px] shadow-sm">
                  Lihat Detail Jurusan
                </button>
              </Link>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Other Recommendations List */}
              <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[19px] font-bold text-[#0B3B60]">Rekomendasi Teratas Lainnya</h3>
                  <Menu className="text-[#0B3B60]" size={20} />
                </div>
                
                <div className="space-y-0">
                  {/* Map the top 5 (including topMajor as rank 1 like the screenshot) */}
                  {[topMajor, ...otherMajors.slice(0, 4)].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0 last:pb-0 gap-4">
                      <div className="flex items-center gap-5 w-full">
                        <div className="w-12 h-12 rounded-xl bg-slate-100/80 flex items-center justify-center text-[#0B3B60] font-bold text-lg shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[16px] font-semibold text-slate-800 mb-2 line-clamp-1">{item.major}</h4>
                          <div className="flex items-center gap-3">
                            <div className="w-32 sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
                              <div className="h-full bg-[#65a30d] rounded-full" style={{ width: `${item.matchPercent}%` }} />
                            </div>
                            <span className="text-[13px] font-bold text-[#65a30d]">{item.matchPercent}%</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/detail-jurusan?major=${encodeURIComponent(item.major)}`}>
                        <button className="shrink-0 px-6 py-2 rounded-lg border-2 border-slate-200 text-[#0B3B60] font-bold text-sm hover:border-[#0B3B60] transition-colors">
                          Detail
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Prospects Card */}
              <div className="bg-[#305c8a] rounded-[24px] shadow-md p-8">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-orange-300" size={24} />
                  <h3 className="text-[20px] font-bold text-white">Prospek Karir Masa Depan</h3>
                </div>
                <p className="text-blue-100/90 text-[15px] mb-8 leading-relaxed pr-8">
                  {prospectDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {topCareers.map((careerName, idx) => {
                    const meta = getCareerMeta(careerName)
                    return (
                      <div key={idx} className="bg-white/10 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                        <div>
                          <div className="text-blue-200/80 text-[11px] font-bold tracking-wider uppercase mb-3">{categoryLabels[idx] || 'PROSPECT'}</div>
                          <div className="text-white font-semibold text-[15px] mb-2 line-clamp-2 leading-tight">{careerName}</div>
                        </div>
                        <div className="text-blue-100/60 text-[11px] mt-2 leading-snug">Gaji rata-rata: {meta.salaryRange}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
