CREATE TABLE "posts_like" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "posts_rating" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"user_id" text,
	"rating" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts_like" ADD CONSTRAINT "posts_like_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_like" ADD CONSTRAINT "posts_like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_rating" ADD CONSTRAINT "posts_rating_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_rating" ADD CONSTRAINT "posts_rating_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;