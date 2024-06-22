ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_exercise_event_id_exercise_events_id_fk";
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_exercise_id_exercises_id_fk";

ALTER TABLE "exercise_events" ALTER COLUMN "id" SET DATA TYPE varchar(13);--> statement-breakpoint
ALTER TABLE "exercise_sets" ALTER COLUMN "id" SET DATA TYPE varchar(13);--> statement-breakpoint
ALTER TABLE "exercise_sets" ALTER COLUMN "exercise_event_id" SET DATA TYPE varchar(13);--> statement-breakpoint
ALTER TABLE "exercise_sets" ALTER COLUMN "exercise_id" SET DATA TYPE varchar(13);--> statement-breakpoint
ALTER TABLE "exercises" ALTER COLUMN "id" SET DATA TYPE varchar(13);