'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, GraduationCap, FlaskConical, TrendingUp, Sparkles, Gamepad2, Code2, ShieldCheck, Database, Bot } from 'lucide-react'
import { getCareerMeta } from '@/lib/constants/career-meta'

export interface DetailJurusanSectionProps {
  userName: string
  selectedMajor: string
  majorMeta: {
    degree: string
    group: string
    prospect: string
    description: string
    fullDescription: string
    subjects: string[]
    emoji: string
  }
  matchPercent: number
  riasecCode: string
  previewCareers: string[]
}

const subjectIcons = [Code2, Database, ShieldCheck, Bot]

export const DetailJurusanSection = ({
  userName,
  selectedMajor,
  majorMeta,
  matchPercent,
  riasecCode,
  previewCareers
}: DetailJurusanSectionProps) => {
  const [activeTab, setActiveTab] = useState<'tentang' | 'kecocokan'>('tentang')
  const firstName = userName.split(' ')[0]
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50/50">
      {/* Topbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 h-[72px] flex items-center justify-between px-8 shrink-0">
        <h1 className="text-[20px] font-bold text-[#0B3B60]">Detail Jurusan</h1>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer p-1.5 px-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all">
            <div className="w-7 h-7 rounded-full bg-[#1a4b8c] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">{firstName}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8 space-y-6">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              
              {/* Hero Section */}
              <div className="relative h-[280px] rounded-[24px] overflow-hidden shadow-sm bg-[#08203e]">
                {/* Background Illustration (positioned to the right) */}
                <div 
                  className="absolute inset-0 bg-cover bg-right"
                  style={{ 
                    backgroundImage: `url('/images/hero-abstract.png')`,
                    opacity: 0.85
                  }}
                />

                {/* Left-to-Right gradient overlay to make text highly readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#08203e] via-[#08203e]/80 to-transparent" />
                
                {/* Bottom-to-Top gradient for extra depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08203e]/90 via-[#08203e]/20 to-transparent" />
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-col justify-end z-10 w-2/3">
                  <h1 className="text-white text-[32px] font-bold mb-3 drop-shadow-md">{selectedMajor}</h1>
                  <p className="text-blue-50/90 text-[15px] leading-relaxed max-w-2xl drop-shadow">
                    {majorMeta.description}
                  </p>
                </div>
              </div>

              {/* Info Cards (Gelar, Jenis, Prospek) */}
              <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm flex items-center justify-between divide-x divide-slate-100">
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <GraduationCap className="text-slate-500" size={24} />
                  <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Gelar</span>
                  <span className="text-[17px] font-bold text-[#0B3B60]">{majorMeta.degree}</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <FlaskConical className="text-slate-500" size={24} />
                  <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Jenis</span>
                  <span className="text-[17px] font-bold text-[#0B3B60]">{majorMeta.group}</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <TrendingUp className="text-slate-500" size={24} />
                  <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Prospek</span>
                  <span className="text-[17px] font-bold text-[#0B3B60]">{majorMeta.prospect}</span>
                </div>
              </div>

              {/* Tabs Content */}
              <div className="bg-white rounded-[24px] border border-slate-200 overflow-hidden shadow-sm flex-1">
                {/* Tabs Header */}
                <div className="flex items-center gap-8 px-10 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveTab('tentang')}
                    className={`py-5 font-semibold text-[15px] relative transition-colors ${activeTab === 'tentang' ? 'text-[#0B3B60]' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Tentang Jurusan
                    {activeTab === 'tentang' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0B3B60] rounded-t-full" />
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab('kecocokan')}
                    className={`py-5 font-semibold text-[15px] relative transition-colors ${activeTab === 'kecocokan' ? 'text-[#0B3B60]' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Kecocokan
                    {activeTab === 'kecocokan' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0B3B60] rounded-t-full" />
                    )}
                  </button>
                </div>
                
                {/* Tabs Body */}
                <div className="p-10">
                  {activeTab === 'tentang' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-[15px] text-slate-600 leading-loose space-y-6">
                        <p>{majorMeta.fullDescription}</p>
                        <p>
                          Mahasiswa jurusan ini akan dilatih untuk memiliki pola pikir analitis dan sistematis. Selain fokus pada teori, kamu juga akan banyak melakukan praktik baik di laboratorium maupun pengerjaan proyek nyata.
                        </p>
                      </div>

                      <h3 className="text-[18px] font-bold text-[#0B3B60] mt-12 mb-6">Apa yang akan kamu pelajari?</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {majorMeta.subjects.slice(0, 4).map((subject, idx) => {
                          const Icon = subjectIcons[idx % subjectIcons.length]
                          return (
                            <div key={idx} className="bg-slate-50 rounded-[16px] p-6 flex gap-4">
                              <div className="shrink-0 mt-1">
                                <Icon className="text-[#0B3B60]" size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-[#0B3B60] text-[15px] mb-2">{subject}</h4>
                                <p className="text-[13px] text-slate-500 leading-relaxed">
                                  Mempelajari fondasi dan praktik tingkat lanjut terkait dengan topik {subject.toLowerCase()} secara komprehensif.
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'kecocokan' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="text-[15px] text-slate-600 leading-loose space-y-6">
                        <p>
                          Berdasarkan profil RIASEC-mu ({riasecCode}), jurusan {selectedMajor} ini sangat direkomendasikan karena selaras dengan kecenderungan dominanmu.
                        </p>
                        <p>
                          Kamu menunjukkan potensi besar dalam menyelesaikan tantangan-tantangan kompleks yang akan sering ditemui di prodi ini, serta memiliki minat yang kuat pada gaya belajar observasional dan terstruktur.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              
              {/* Analisis Card */}
              <div className="bg-[#295b8c] rounded-[24px] p-8 text-white shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6 text-orange-300">
                  <Sparkles size={18} className="fill-current" />
                  <span className="text-[11px] font-bold tracking-widest uppercase">ANALISIS</span>
                </div>

                <div className="flex items-end gap-2 mb-6">
                  <span className="text-[48px] font-black leading-none">{matchPercent}%</span>
                  <span className="text-[15px] font-medium text-blue-100 pb-1.5">Match dengan profilmu</span>
                </div>

                <p className="text-[14px] text-blue-100/90 leading-relaxed mb-8">
                  Berdasarkan hasil tes minat bakatmu ({riasecCode}), kamu memiliki kemampuan analitis dan pemecahan masalah yang menonjol. {selectedMajor} adalah <strong>"The Perfect Choice"</strong> untukmu.
                </p>
              </div>

              {/* Prospek Karir Populer */}
              <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[16px] font-bold text-[#0B3B60]">Prospek Karir Populer</h3>
                  <Link href={`/prospek-karier?major=${encodeURIComponent(selectedMajor)}`} className="text-[12px] font-bold text-[#0B3B60] hover:underline">
                    Lihat Semua
                  </Link>
                </div>

                <div className="space-y-3">
                  {previewCareers.slice(0, 3).map((career, idx) => {
                    const cm = getCareerMeta(career)
                    return (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 font-bold shrink-0 text-xl">
                          {cm.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#0B3B60] text-[14px] truncate mb-1">{career}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Rata-rata Gaji</p>
                        </div>
                        <div className="text-[12px] font-bold text-[#0B3B60] shrink-0">
                          {cm.salaryRange}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Coba Simulasi Jurusan (Redirect to Kompas Masa Depan) */}
              <div className="bg-white rounded-[24px] border-2 border-dashed border-slate-200 p-8 shadow-sm text-center flex flex-col items-center">
                <Gamepad2 size={32} className="text-[#0B3B60] mb-4" />
                <h3 className="text-[16px] font-bold text-[#0B3B60] mb-3">Coba Kompas Masa Depan</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                  Rasakan pengalaman menjadi mahasiswa melalui mini-games interaktif kami.
                </p>
                <Link href="/game-interaktif" className="w-full">
                  <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3.5 rounded-xl transition-all">
                    Mulai Main
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
