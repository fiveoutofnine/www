CREATE TABLE "mileage_logs_hourly" (
	"id" text PRIMARY KEY NOT NULL,
	"time" timestamp NOT NULL,
	"value" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mileage_logs_hourly_time_unique" UNIQUE("time")
);
