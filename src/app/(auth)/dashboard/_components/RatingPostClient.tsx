'use client'

import { Button } from '@/components/ui/button'
import { createPostRating } from '@/lib/api/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default function RatingPostClient({
  id,
  userId,
}: {
  id: number
  userId: string
}) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await createPostRating({ id, userId }),
    onSuccess: (data) => {
      console.log('asd')

      queryClient.invalidateQueries({ queryKey: ['getPosts'] })
    },
  })

  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      {isPending && <Loader2 className="w-4 h-4" />}
      Raking 5
    </Button>
  )
}
