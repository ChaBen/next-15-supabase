'use client'

import { Button } from '@/components/ui/button'
import { DeletePost, LikePost, RatingPost, withAuth } from './action'
import { ThumbsUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import RatingPostClient from './RatingPostClient'
import { getPosts } from '@/lib/api/posts'
import { useQuery } from '@tanstack/react-query'

export default function PostListClient({ userId }: { userId: string }) {
  const { data, error } = useQuery({
    queryKey: ['getPosts'],
    queryFn: () => getPosts({ limit: 10, page: 1 }),
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.data.map((item: any) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.content}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.user?.name}</p>
            <p>{item.user?.email}</p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 flex-wrap">
              <p>
                Rating: {item.rating.avg} ({item.rating.count})
              </p>
              {/* <form
                action={async () => {
                  'use server'
                  LikePost({
                    id: Number(item.id),
                    userId: userId,
                  })
                }}
              >
                <Button>
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </Button>
              </form> */}
              <RatingPostClient id={item.id} userId={userId} />
              {/* <form
                action={async () => {
                  'use server'
                  await DeletePost(Number(item.id), userId)
                }}
              >
                <Button>Delete</Button>
              </form> */}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}