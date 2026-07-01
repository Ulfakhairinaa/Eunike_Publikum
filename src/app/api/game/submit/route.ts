import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { missionId, score } = await req.json()

    if (!missionId) {
      return NextResponse.json({ error: 'Missing missionId' }, { status: 400 })
    }

    const mission = await prisma.gameMission.findUnique({
      where: { id: missionId },
      include: { major: true }
    })

    if (!mission) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 })
    }

    // Sistem poin SS/P/J/BP: tidak ada jawaban salah — setiap submission = completed.
    // min_point hanya dipakai untuk membuka misi berikutnya (via totalPoints),
    // bukan sebagai ambang nilai per-misi.
    const status = 'completed'

    // Upsert progress — hanya update jika skor lebih tinggi dari sebelumnya
    const existing = await prisma.gameProgress.findUnique({
      where: {
        user_id_mission_id: {
          user_id: user.id,
          mission_id: mission.id
        }
      }
    })

    const progress = await prisma.gameProgress.upsert({
      where: {
        user_id_mission_id: {
          user_id: user.id,
          mission_id: mission.id
        }
      },
      update: {
        current_points: existing ? Math.max(existing.current_points, score) : score,
        status: 'completed'
      },
      create: {
        user_id: user.id,
        mission_id: mission.id,
        current_points: score,
        status: status
      }
    })

    // Hitung total poin user HANYA dari misi-misi di major (kategori) yang sama
    const allProgress = await prisma.gameProgress.findMany({
      where: { 
        user_id: user.id,
        mission: {
          major_id: mission.major_id
        }
      }
    })
    const totalPoints = allProgress.reduce((sum, p) => sum + p.current_points, 0)

    // Cari misi berikutnya dalam major yang sama, level lebih tinggi
    let nextMission: { id: string; title: string } | null = null
    if (status === 'completed') {
      const nextCandidate = await prisma.gameMission.findFirst({
        where: {
          major_id: mission.major_id,
          level: { gt: mission.level }
        },
        orderBy: { level: 'asc' },
        select: { id: true, title: true, min_point: true }
      })

      if (nextCandidate) {
        // Misi berikutnya terbuka jika totalPoints >= min_point atau misi pertama
        if (totalPoints >= nextCandidate.min_point) {
          nextMission = { id: nextCandidate.id, title: nextCandidate.title }
        }
      }
    }

    return NextResponse.json({
      success: true,
      progress,
      totalPoints,
      nextMission
    })
  } catch (error) {
    console.error('Error submitting game:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
