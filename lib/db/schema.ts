import {
  integer,
  json,
  pgTable,
  /* real, */
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// -----------------------------------------------------------------------------
// Running
// -----------------------------------------------------------------------------

/* export const mileageLogsHourly = pgTable('mileage_logs_hourly', {
  id: text('id').primaryKey(),
  timestamp: timestamp('timestamp').notNull().unique(),
  mileage: real('mileage').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}); */

// -----------------------------------------------------------------------------
// Chess NFT
// -----------------------------------------------------------------------------

export const chessNftMetadata = pgTable('chess_nft_metadata', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  animationUrl: text('animation_url').notNull(),
  attributes: json('attributes').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
