'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function getGameMissions(majorId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Fetch missions for the major
  const missions = await prisma.gameMission.findMany({
    where: { major_id: majorId },
    orderBy: { level: 'asc' },
    include: { questions: true }
  })

  // Fetch progress for this user and major
  const missionIds = missions.map(m => m.id)
  const progressList = await prisma.gameProgress.findMany({
    where: {
      user_id: user.id,
      mission_id: { in: missionIds }
    }
  })

  // Format response combining mission and progress
  const progressMap = new Map(progressList.map(p => [p.mission_id, p]))

  return missions.map(mission => {
    let status = 'locked'
    let current_points = 0
    
    // Default unlock first level if no progress
    if (mission.level === 1) {
      status = 'unlocked'
    }

    const progress = progressMap.get(mission.id)
    if (progress) {
      status = progress.status
      current_points = progress.current_points
    }

    return {
      ...mission,
      status,
      current_points
    }
  })
}

export async function submitGameMission(missionId: string, pointsEarned: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const mission = await prisma.gameMission.findUnique({
    where: { id: missionId }
  })

  if (!mission) throw new Error('Mission not found')

  // Determine if passed
  const passed = pointsEarned >= mission.min_point
  const newStatus = passed ? 'completed' : 'unlocked' // keep unlocked if failed to allow retry

  // Update progress for current mission
  await prisma.gameProgress.upsert({
    where: {
      user_id_mission_id: {
        user_id: user.id,
        mission_id: missionId
      }
    },
    update: {
      status: newStatus,
      current_points: pointsEarned
    },
    create: {
      user_id: user.id,
      mission_id: missionId,
      status: newStatus,
      current_points: pointsEarned
    }
  })

  // If passed, unlock next level
  if (passed) {
    const nextMission = await prisma.gameMission.findFirst({
      where: {
        major_id: mission.major_id,
        level: mission.level + 1
      }
    })

    if (nextMission) {
      await prisma.gameProgress.upsert({
        where: {
          user_id_mission_id: {
            user_id: user.id,
            mission_id: nextMission.id
          }
        },
        update: {
          status: 'unlocked' // only if it was locked, but upsert 'update' just sets it
        },
        create: {
          user_id: user.id,
          mission_id: nextMission.id,
          status: 'unlocked',
          current_points: 0
        }
      })
    }
  }

  return { success: true, passed }
}
