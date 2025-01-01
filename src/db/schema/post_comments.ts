import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'
import { posts } from './posts'

export const postComments = pgTable(
  'post_comments',
  {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id),
    mentionUserId: text('mention_user_id').references(() => user.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (t) => [
    {
      parentId: integer('parent_id').references(() => t.id),
    },
  ],
)

export type PostComments = typeof postComments.$inferSelect
export type InsertPostComments = typeof postComments.$inferInsert
