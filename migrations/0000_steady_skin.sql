CREATE TABLE "chess_nft_metadata" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text,
	"animation_url" text NOT NULL,
	"attributes" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
