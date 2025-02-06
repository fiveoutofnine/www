CREATE TABLE "mileage_logs_daily" (
	"id" text PRIMARY KEY NOT NULL,
	"time" timestamp NOT NULL,
	"value" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mileage_logs_daily_time_unique" UNIQUE("time")
);
--> statement-breakpoint
CREATE TABLE "mileage_logs_monthly" (
	"id" text PRIMARY KEY NOT NULL,
	"time" timestamp NOT NULL,
	"value" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mileage_logs_monthly_time_unique" UNIQUE("time")
);
