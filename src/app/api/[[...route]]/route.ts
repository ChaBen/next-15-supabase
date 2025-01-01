import { postRouter } from '@/server/routes/posts'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { PageConfig } from 'next'

export const config: PageConfig = {
  runtime: 'edge',
}

const app = new Hono()

const routes = app.basePath('/api').route('/posts', postRouter)

export const GET = handle(routes)
export const POST = handle(routes)
export type ApiRoutes = typeof routes
