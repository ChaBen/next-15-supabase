import { auth } from '@/lib/auth'
import { createMiddleware } from 'hono/factory'
import { headers } from 'next/headers'

export const withAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    return c.json({
      message: 'Unauthorized',
    })
  }

  await next()
})
