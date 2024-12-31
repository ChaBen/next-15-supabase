ALTER TABLE "posts_like" DROP CONSTRAINT "posts_like_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_rating" DROP CONSTRAINT "posts_rating_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_rating" ALTER COLUMN "post_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts_rating" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts_like" ADD CONSTRAINT "posts_like_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_rating" ADD CONSTRAINT "posts_rating_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;