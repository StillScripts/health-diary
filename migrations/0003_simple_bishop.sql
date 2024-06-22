DO $$ BEGIN
 CREATE TYPE "public"."activity_type" AS ENUM('Body Weight', 'Weights', 'Distance', 'Sport');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "activity_type" "activity_type";