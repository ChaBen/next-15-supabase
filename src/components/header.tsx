import { signOut } from '@/lib/auth-client'
import { Button } from './ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {session ? (
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <Button>Sign out</Button>
        </form>
      ) : (
        <form
          action={async () => {
            'use server'
            redirect('/auth/login')
          }}
        >
          <Button>Sign in</Button>
        </form>
      )}
    </header>
  )
}
