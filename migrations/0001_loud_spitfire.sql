ALTER TABLE "users" ADD COLUMN "first_name" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "full_name";