-- 1. Add the column with a default value
ALTER TABLE "exercises" ADD COLUMN "userId" uuid;

-- 2. Populate existing rows with the default value (if needed)
UPDATE "exercises" SET "userId" = 'd9eaca49-7ba8-4d0c-a630-04ece6e95025' WHERE "userId" IS NULL;

-- 3. Alter the column to make it non-nullable
ALTER TABLE "exercises" ALTER COLUMN "userId" SET NOT NULL;

DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
