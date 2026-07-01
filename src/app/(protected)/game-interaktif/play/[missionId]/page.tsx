import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import MissionClient from './mission-client'

export default async function PlayMissionPage({ params }: { params: Promise<{ missionId: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { missionId } = await params
  const mission = await prisma.gameMission.findUnique({
    where: { id: missionId },
    include: {
      questions: true,
      major: true,
    }
  })

  if (!mission) redirect('/game-interaktif')

  // Cek apakah sudah dikerjakan
  const progress = await prisma.gameProgress.findUnique({
    where: {
      user_id_mission_id: {
        user_id: user!.id,
        mission_id: mission.id
      }
    }
  })

  // Bangun URL kembali ke halaman daftar misi kategori ini
  const backUrl = `/game-interaktif/${mission.major.arena.toLowerCase()}/${mission.major.category.toLowerCase()}`

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-slate-100/50 p-4">
      <MissionClient
        mission={mission}
        userId={user!.id}
        initialProgress={progress}
        backUrl={backUrl}
      />
    </div>
  )
}
