'use client'

import { useQuery } from '@tanstack/react-query'

export default function page() {
  const { data } = useQuery({
    queryKey: ['getPosts'],
    queryFn: async () => {
      const response = await fetch(
        'https://hono-cloudflare.ckqlss.workers.dev/',
      )
      return response.json()
    },
  })
  return (
    <div className="container p-6">
      <h1>Hello World</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
