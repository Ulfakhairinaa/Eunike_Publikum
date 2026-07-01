'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateProfileAction(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const school = formData.get('school') as string
    const gender = formData.get('gender') as string

    if (!name) return { error: 'Nama lengkap wajib diisi.' }

    await prisma.user.update({
      where: { id: user.id },
      data: { name, school, gender }
    })

    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Terjadi kesalahan saat menyimpan profil.' }
  }
}

export async function deleteAccountAction() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Hapus data dari Prisma
    await prisma.assessment.deleteMany({
      where: { user_id: user.id }
    })

    await prisma.user.delete({
      where: { id: user.id }
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Terjadi kesalahan saat menghapus akun.' }
  }
}
