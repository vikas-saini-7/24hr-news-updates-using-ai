ALTER TABLE "articles" ADD COLUMN "slug" varchar(300) NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_slug_unique" UNIQUE("slug");