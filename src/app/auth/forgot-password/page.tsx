import { resetPassword } from '../actions'
import { ForgotPasswordSection } from '@/components/sections/ForgotPasswordSection'

export const metadata = {
  title: 'Lupa Kata Sandi - YO-MAP'
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordSection onSubmit={resetPassword} />
}
