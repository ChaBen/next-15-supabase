import { auth } from '@/lib/auth'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const withAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }

  redirect('/auth/login')
})
