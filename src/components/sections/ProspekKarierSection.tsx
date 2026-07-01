'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Briefcase, ChevronRight, Banknote, Zap } from 'lucide-react'
import { CareerMeta } from '@/lib/constants/career-meta'

const DEMAND_DOT: Record<string, string> = {
  'Sangat Tinggi': 'bg-emerald-500',
  'Tinggi': 'bg-blue-500',
  'Sedang': 'bg-amber-500',
}

interface CareerItem {
  name: string
  meta: CareerMeta
}

export interface ProspekKarierSectionProps {
  selectedMajor: string | null
  riasecCode: string
  suggestedField: string
  careers: CareerItem[]
  riasecColors: Record<string, { bg: string; text: string }>
}

export const ProspekKarierSection = ({
  selectedMajor,
  riasecCode,
  suggestedField,
  careers,
  riasecColors
}: ProspekKarierSectionProps) => {

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50/50">
      {/* Topbar / Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 h-[72px] flex items-center px-8 shrink-0">
        <div className="flex items-center gap-3">
          <Link 
            href={selectedMajor ? `/detail-jurusan?major=${encodeURIComponent(selectedMajor)}` : '/rekomendasi-jurusan'} 
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            {selectedMajor ? 'Detail Jurusan' : 'Rekomendasi Jurusan'}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-sm text-slate-800 font-bold">Prospek Karier</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto p-6 lg:p-8 space-y-8">
          
          {/* Header Texts & Badge */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-[32px] font-bold text-[#0B3B60] leading-tight mb-2">Prospek Karier</h1>
              <p className="text-slate-500 text-[15px] leading-relaxed max-w-2xl">
                {selectedMajor 
                  ? <>Karier yang tersedia untuk lulusan <strong className="text-slate-700">{selectedMajor}</strong> berdasarkan profil RIASEC <strong className="text-[#0B3B60]">{riasecCode}</strong> kamu.</>
                  : <>Daftar karier yang cocok berdasarkan profil RIASEC <strong className="text-[#0B3B60]">{riasecCode}</strong> dan kecenderungan <strong className="text-blue-600">{suggestedField}</strong> kamu.</>
                }
              </p>
            </div>
            
            <div className="shrink-0 flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
                {riasecCode.split('').map((letter, i) => (
                  <span key={i} className={`w-8 h-8 rounded-lg ${riasecColors[letter]?.bg ?? 'bg-slate-400'} flex items-center justify-center text-white font-bold text-[13px]`}>
                    {letter}
                  </span>
                ))}
                <span className="text-[15px] font-bold text-[#0B3B60] pl-2">{riasecCode}</span>
              </div>
              <div className="text-[13px] font-bold text-slate-400 text-right">
                <span className="block">{careers.length} profesi</span>
                <span className="block font-medium">tersedia</span>
              </div>
            </div>
          </div>

          {/* Grid Layout for Careers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold text-[#0B3B60]">Semua Profesi ({careers.length})</h3>
              <span className="text-[13px] font-medium text-slate-400">Berdasarkan kode {riasecCode}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {careers.map((career, idx) => (
                <div key={idx} className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {career.meta.emoji}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h4 className="text-[16px] font-bold text-[#0B3B60] truncate mb-1.5 group-hover:text-blue-600 transition-colors">{career.name}</h4>
                      <p className="text-[13px] text-slate-500 leading-relaxed">
                        {career.meta.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[13px]">
                      <Banknote size={14} />
                      {career.meta.salaryRange}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${DEMAND_DOT[career.meta.demand] ?? 'bg-slate-400'}`} />
                      <span className="text-[12px] font-bold text-slate-600">{career.meta.demand}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-slate-100">
                    {career.meta.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
