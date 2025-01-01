import { ApiRoutes } from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'

const client = hc<ApiRoutes>('http://localhost:3000', {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: 'include',
    }),
}).api

export default client
