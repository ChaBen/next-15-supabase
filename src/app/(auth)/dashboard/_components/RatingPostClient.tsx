'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

export default function RatingPostClient({
  id,
  userId,
}: {
  id: number
  userId: string
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      console.log('rating')

      const response = await fetch('http://localhost:3000/api/posts/rating', {
        method: 'POST',
        body: JSON.stringify({
          id: Number(id),
          userId: userId,
        }),
      })
      const data = await response.json()
      return data
    },
  })
  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      {isPending && <Loader2 className="w-4 h-4" />}
      Raking 5
    </Button>
  )
}
