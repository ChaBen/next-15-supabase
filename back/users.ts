import { relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { products } from './products'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
}))

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
