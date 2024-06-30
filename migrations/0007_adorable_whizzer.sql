-- Step 1: Remove the NOT NULL constraint
ALTER TABLE "exercise_events" ALTER COLUMN "start_time" DROP NOT NULL;

-- Step 2: Set the current values of start_time to NULL
UPDATE "exercise_events" SET "start_time" = NULL;

-- Step 3: Alter the start_time data type to varchar(5)
ALTER TABLE "exercise_events" ALTER COLUMN "start_time" TYPE varchar(5);

-- Step 4: Alter the end_time data type to varchar(5)
ALTER TABLE "exercise_events" ALTER COLUMN "end_time" SET DATA TYPE varchar(5);