import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

export const postsLike = pgTable('posts_like', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id, {
    onDelete: 'cascade',
  }),
  userId: text('user_id').references(() => user.id),
})

export const postsRating = pgTable('posts_rating', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .references(() => posts.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  rating: integer('rating').notNull(),
})

export type Posts = typeof posts.$inferSelect
export type InsertPosts = typeof posts.$inferInsert
