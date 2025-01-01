import { getPosts } from '@/lib/api/posts'
import PostListClient from './PostListClient'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import getQueryClient from '@/lib/getQueryClient'

export default async function PostList({ userId }: { userId: string }) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['getPosts'],
    queryFn: () => getPosts({ limit: 10, page: 1 }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListClient userId={userId} />
    </HydrationBoundary>
  )
}
