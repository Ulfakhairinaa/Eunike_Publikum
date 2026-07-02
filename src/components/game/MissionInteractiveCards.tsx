'use client'

import { useState } from 'react'
import { Lock, Play, Rocket, CheckCircle, Flag, FileText } from 'lucide-react'
import { MissionPlayModal } from './MissionPlayModal'

export function MissionInteractiveCards({ missions, initialPoints }: { missions: any[], initialPoints: Record<string, { status: string, points: number }> }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedMission, setSelectedMission] = useState<any | null>(null)
  
  // Use lazy initialization to avoid infinite re-renders
  const [missionProgress, setMissionProgress] = useState<Record<string, { status: string, points: number }>>(() => {
    return initialPoints
  })

  const handleMissionSuccess = (missionId: string, score: number) => {
    setMissionProgress(prev => ({
      ...prev,
      [missionId]: { status: 'completed', points: Math.max(prev[missionId]?.points || 0, score) }
    }))
  }

  const totalPoints = missions.reduce((sum, m) => sum + (missionProgress[m.id]?.points || 0), 0)
  const completedCount = missions.filter(m => missionProgress[m.id]?.status === 'completed').length

  return (
    <div className="flex flex-col gap-10">
      {/* Mission Cards Grid (Flip Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" style={{ perspective: '1000px' }}>
        {missions.map((mission: any, index: number) => {
          const isFlipped = hoveredCard === mission.id
          
          const prog = missionProgress[mission.id]
          const isUnlocked = index === 0 || totalPoints >= mission.min_point || (prog && prog.status !== 'locked')
          const isCompleted = prog?.status === 'completed'
          
          // Badge & Theme Colors (For BACK SIDE)
          let badgeBg = 'bg-green-100 text-green-600'
          let levelText = 'EASY'
          let pointsColor = 'text-[#0B3B60]'
          let borderColor = 'border-[#0B3B60]'
          let cardBg = 'bg-white'
          
          // Target Points based on Level
          const targetPoints = mission.questions ? mission.questions.length * 10 : (mission.level === 1 ? 20 : mission.level === 2 ? 30 : 40)

          // Gradient Colors (For FRONT SIDE)
          let gradient = 'from-emerald-400 to-green-600'

          if (mission.level === 2) { 
            levelText = 'MEDIUM'
            gradient = 'from-amber-400 to-orange-500' 
            badgeBg = 'bg-orange-100 text-orange-600'
            pointsColor = 'text-amber-700'
            borderColor = 'border-amber-600'
          }
          else if (mission.level >= 3) { 
            levelText = 'HARD'
            gradient = 'from-rose-400 to-red-600' 
            badgeBg = 'bg-red-100 text-red-600'
            pointsColor = 'text-red-500'
            borderColor = 'border-red-500'
          }

          if (isCompleted) {
             gradient = 'from-[#FFDCBC] to-[#FFDCBC]'
          } else if (!isUnlocked) {
             gradient = 'from-slate-300 to-slate-400'
             borderColor = 'border-gray-200'
             cardBg = 'bg-slate-50'
          }

          const frontTextColor = isCompleted ? 'text-orange-950' : 'text-white'

          return (
            <div 
              key={mission.id} 
              className="relative w-full h-[360px] [transform-style:preserve-3d] transition-all duration-700 ease-in-out cursor-pointer"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              onMouseEnter={() => setHoveredCard(mission.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                if (isUnlocked && !isCompleted) setSelectedMission(mission)
              }}
            >
              {/* FRONT SIDE (Gradient/Flat Color) */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} shadow-lg overflow-hidden flex flex-col justify-center items-center ${frontTextColor} [backface-visibility:hidden] p-8 text-center`}>
                <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  {levelText}
                </div>
                
                {isCompleted ? (
                   <CheckCircle size={64} className={`mb-4 ${frontTextColor} opacity-90`} />
                ) : !isUnlocked ? (
                   <Lock size={64} className={`mb-4 ${frontTextColor} opacity-50`} />
                ) : (
                   <Play size={64} className={`mb-4 ${frontTextColor} opacity-90 ml-2`} />
                )}
                
                <h3 className="font-black text-3xl mb-2 drop-shadow-md">
                  MISI {index + 1}
                </h3>
                
                <p className={`text-sm font-medium ${isCompleted ? 'text-orange-950/80' : 'text-white/80'} max-w-[200px] leading-tight mt-2`}>
                  {isCompleted ? 'Sudah Diselesaikan' : !isUnlocked ? `Butuh ${mission.min_point} Poin` : 'Siap Dimainkan'}
                </p>
              </div>

              {/* BACK SIDE (Detailed UI) */}
              <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border-[1.5px] p-6 flex flex-col transition-all ${borderColor} ${cardBg} shadow-xl`}>
                
                {/* Top Badges */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${!isUnlocked ? 'bg-gray-200 text-gray-400' : badgeBg}`}>
                    {levelText}
                  </span>
                  <span className={`text-sm font-bold flex items-center gap-1 ${!isUnlocked ? 'text-gray-400' : pointsColor}`}>
                    <CheckCircle size={14} /> Target {targetPoints} Poin
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="mb-4 flex-1">
                  <h3 className={`font-bold text-lg mb-2 leading-tight ${!isUnlocked ? 'text-gray-400' : 'text-slate-800'}`}>
                    Misi {index + 1}: {mission.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${!isUnlocked ? 'text-gray-400' : 'text-slate-500'}`}>
                    {mission.description || "Uji kemampuan dasar dan pahami fundamental yang diperlukan."}
                  </p>
                </div>

                {/* Checklist */}
                {!isUnlocked ? (
                  <div className="space-y-2 mb-6 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <FileText size={14} /> {mission.questions?.length || 0} Soal Studi Kasus
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle size={14} /> Capai Misi {index} Untuk Membuka
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Lock size={14} /> Syarat Buka: Total {mission.min_point} Poin
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 mb-6 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <FileText size={14} /> {mission.questions?.length || 0} Soal Pilihan Ganda
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Flag size={14} /> Lulus: Selesaikan Semua Soal
                    </div>
                  </div>
                )}

                {/* Button */}
                {isCompleted ? (
                  <div className="w-full py-3 rounded-lg bg-green-50 text-green-600 font-bold text-center text-sm">
                    Selesai ✓
                  </div>
                ) : !isUnlocked ? (
                  <div className="w-full py-3 rounded-lg bg-gray-200 text-gray-400 font-bold text-center text-sm">
                    Terkunci
                  </div>
                ) : (
                  <div className={`w-full py-3 rounded-lg font-bold text-center text-sm transition-colors ${
                    index === 0 
                    ? 'bg-[#0B3B60] text-white hover:bg-[#082a45]' 
                    : 'bg-blue-50 text-slate-700 hover:bg-blue-100'
                  }`}>
                    {index === 0 ? 'Mulai Misi ▷' : 'Lanjut Misi →'}
                  </div>
                )}

                {/* Lock overlay for locked cards */}
                {!isUnlocked && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none rounded-xl bg-white/20 backdrop-blur-[1px]">
                    <Lock size={48} className="text-gray-400/80 drop-shadow-lg" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Banner */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#295b82] to-[#123652] p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden mt-4">
        <div className="md:w-2/3 z-10">
          <h2 className="text-2xl font-bold mb-3">Ayo Capai Skor Maksimal!</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-lg">
            Setiap misi disesuaikan dengan kurikulum industri terbaru. Raih lencana "Tech Master" dengan menyelesaikan seluruh rangkaian misi ini.
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 rounded-lg px-4 py-2 border border-white/20 min-w-[120px]">
              <div className="text-[10px] text-white/70 font-bold uppercase tracking-wider mb-1">Misi Selesai</div>
              <div className="text-xl font-bold">{completedCount}/{missions.length}</div>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 border border-white/20 min-w-[120px]">
              <div className="text-[10px] text-white/70 font-bold uppercase tracking-wider mb-1">Akumulasi Poin</div>
              <div className="text-xl font-bold">{totalPoints}</div>
            </div>
          </div>
        </div>
        
        {/* Rocket Icon */}
        <div className="hidden md:flex relative z-10 w-32 h-32 items-center justify-center mr-8">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/30 animate-[spin_10s_linear_infinite]" />
          <Rocket size={48} className="text-white" />
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      <MissionPlayModal
        mission={selectedMission}
        isOpen={!!selectedMission}
        onClose={() => setSelectedMission(null)}
        onSuccess={(score) => {
          if (selectedMission) handleMissionSuccess(selectedMission.id, score)
        }}
        totalPoints={totalPoints}
        onNextMission={() => {
          const currentIndex = missions.findIndex(m => m.id === selectedMission?.id)
          if (currentIndex >= 0 && currentIndex < missions.length - 1) {
            const nextMission = missions[currentIndex + 1]
            const isNextUnlocked = (currentIndex + 1) === 0 || totalPoints >= nextMission.min_point || (missionProgress[nextMission.id] && missionProgress[nextMission.id].status !== 'locked')
            if (isNextUnlocked) {
              setSelectedMission(nextMission)
              return
            }
          }
          setSelectedMission(null)
        }}
      />
    </div>
  )
}
