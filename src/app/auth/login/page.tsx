import { auth } from '@/lib/auth'
import LoginClient from './_components/LoginClient'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return redirect('/dashboard')
  }

  return <LoginClient />
}
