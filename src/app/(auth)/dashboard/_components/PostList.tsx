import { Button } from '@/components/ui/button'
import { hc } from 'hono/client'
import { DeletePost, LikePost, RatingPost } from './action'
import { ThumbsUp } from 'lucide-react'
import { AppType } from '@/app/api/posts/route'

export default async function PostList({ userId }: { userId: string }) {
  const response = await fetch('http://localhost:3000/api/posts')
  const { data } = await response.json()

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <p>{item.user?.name}</p>
          <p>{item.user?.email}</p>
          <div className="flex items-center gap-2">
            <form
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
            </form>
            <p>
              Rating: {item.rating.avg} ({item.rating.count})
            </p>
            <form
              action={async () => {
                'use server'
                await RatingPost({
                  id: Number(item.id),
                  userId: userId,
                })
              }}
            >
              <Button>Raking 5</Button>
            </form>
            <form
              action={async () => {
                'use server'
                await DeletePost(Number(item.id))
              }}
            >
              <Button>Delete</Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
