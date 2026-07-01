import { updatePassword } from '../actions'
import { UpdatePasswordSection } from '@/components/sections/UpdatePasswordSection'

export const metadata = {
  title: 'Buat Kata Sandi Baru - YO-MAP'
}

export default function UpdatePasswordPage() {
  return <UpdatePasswordSection onSubmit={updatePassword} />
}
