CREATE TABLE IF NOT EXISTS "exercise_events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"start_time" timestamp DEFAULT now() NOT NULL,
	"end_time" timestamp,
	"notes" text,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise_sets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"reps" integer,
	"exercise_event_id" uuid,
	"exercise_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercises" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_events" ADD CONSTRAINT "exercise_events_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_exercise_event_id_exercise_events_id_fk" FOREIGN KEY ("exercise_event_id") REFERENCES "public"."exercise_events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
