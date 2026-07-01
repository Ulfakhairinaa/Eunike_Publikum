'use client'

import React from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, ClipboardList, Compass, PlayCircle, Gamepad2, ArrowRight } from 'lucide-react'

interface DashboardSectionProps {
  userName: string
  isCompleted: boolean
  riasecCode: string | null
  riasecScores: Record<string, number> | null
  progressPercentage?: number
}

export const DashboardSection = ({ userName, isCompleted, progressPercentage = 0 }: DashboardSectionProps) => {
  const firstName = userName.split(' ')[0]
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  // Calculate circle progress (circumference for a circle with r=36 is ~226)
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col w-full">
      {/* Topbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 h-[72px] flex items-center justify-between px-8 shrink-0">
        <h1 className="text-xl font-bold text-[#0B3B60]">Beranda</h1>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
            <div className="w-8 h-8 rounded-full bg-[#1a4b8c] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">{firstName}</span>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto w-full max-w-[1200px] mx-auto">
        
        {/* Hero Banner */}
        <div className="bg-[#033c69] rounded-2xl p-8 md:p-12 relative overflow-hidden mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Decorative shapes */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#28608e] rounded-full opacity-60"></div>
          
          {/* Left Text */}
          <div className="relative z-10 flex-1 max-w-xl">
            <h2 className="text-4xl md:text-[40px] font-bold text-white mb-6">
              Halo, {firstName}! 👋
            </h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Siap menemukan masa depanmu hari ini?<br/>
              Mulai tes minat &bakat untuk mendapatkan rekomendasi jurusan yang paling cocok.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {!isCompleted ? (
                <Link href="/test">
                  <button className="bg-[#feebb2] hover:bg-[#fde08b] text-[#714b1c] font-bold py-3.5 px-6 rounded-lg flex items-center gap-2 transition-colors text-sm">
                    {progressPercentage > 0 ? 'Lanjutkan Tes' : 'Mulai Tes Sekarang'} <ArrowRight size={18} />
                  </button>
                </Link>
              ) : (
                <Link href="/hasil-analisis">
                  <button className="bg-[#feebb2] hover:bg-[#fde08b] text-[#714b1c] font-bold py-3.5 px-6 rounded-lg flex items-center gap-2 transition-colors text-sm">
                    Lihat Hasil <ArrowRight size={18} />
                  </button>
                </Link>
              )}
              <Link href="/hasil-analisis">
                <button className="bg-[#1e507b] border border-[#3b719f] hover:bg-[#275c89] text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-sm">
                  Lihat Analisis
                </button>
              </Link>
            </div>
          </div>

          {/* Right Progress Card */}
          <div className="relative z-10 w-full md:w-[280px] shrink-0">
            <div className="bg-transparent border border-white/40 rounded-xl p-6 flex flex-col items-center text-center backdrop-blur-sm shadow-sm relative overflow-hidden">
              <h3 className="text-white/90 text-[11px] font-bold tracking-widest uppercase mb-6 relative z-10">PROGRESS KAMU</h3>
              
              <div className="relative w-[110px] h-[110px] mb-6 flex items-center justify-center z-10">
                {/* SVG Circle Progress */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  {/* Background Circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="#275c89"
                    strokeWidth="7"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="#dff000"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Text inside circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#dff000] text-2xl font-bold">{progressPercentage}%</span>
                </div>
              </div>

              <h4 className="text-white font-bold mb-1 text-sm relative z-10">Tes Minat & Bakat</h4>
              <p className="text-white/60 text-xs mb-6 relative z-10">Selesai {progressPercentage}%</p>
              
              <div className="w-full relative z-10">
              {!isCompleted && progressPercentage > 0 ? (
                <Link href="/test" className="w-full block">
                  <button className="w-full bg-[#feebb2] hover:bg-[#fde08b] text-[#714b1c] font-bold py-2.5 rounded-lg transition-colors text-sm">
                    Lanjutkan
                  </button>
                </Link>
              ) : !isCompleted ? (
                 <Link href="/test" className="w-full block">
                  <button className="w-full bg-[#feebb2] hover:bg-[#fde08b] text-[#714b1c] font-bold py-2.5 rounded-lg transition-colors text-sm">
                    Mulai Tes
                  </button>
                </Link>
              ) : (
                <button className="w-full bg-[#275c89] text-white/50 font-bold py-2.5 rounded-lg text-sm cursor-not-allowed">
                  Selesai
                </button>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Fitur Utama */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Fitur Utama</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <Link href="/test" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardList size={28} className="text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Tes Minat & Bakat</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Kenali potensi dirimu lebih dalam.</p>
                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-4 right-4 h-1.5 bg-[#0B3B60] rounded-t-md"></div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/rekomendasi-jurusan" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass size={28} className="text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Rekomendasi Jurusan</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Lihat jurusan yang paling cocok.</p>
                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-4 right-4 h-1.5 bg-orange-300 rounded-t-md"></div>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/game-interaktif" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gamepad2 size={28} className="text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Kompas Masa Depan</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Latih soft skill mu sambil bermain game seru!</p>
                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-4 right-4 h-1.5 bg-green-300 rounded-t-md"></div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}
