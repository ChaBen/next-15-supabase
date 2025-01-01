import { ApiRoutes } from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'

const client = hc<ApiRoutes>(process.env.NEXT_PUBLIC_URL!, {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: 'include',
    }),
}).api

export default client
