import { Button } from './ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-4 ml-auto">
        {session ? (
          <>
            <Avatar>
              <AvatarImage src={session?.user?.image as string} />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <form
              action={async () => {
                'use server'
                await auth.api.signOut({
                  headers: await headers(),
                })
              }}
            >
              <Button>Sign out</Button>
            </form>
          </>
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
      </div>
    </header>
  )
}
