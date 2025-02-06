import { integer, json, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core';

// -----------------------------------------------------------------------------
// Running
// -----------------------------------------------------------------------------

export const mileageLogsHourly = pgTable('mileage_logs_hourly', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  time: timestamp('time').notNull().unique(),
  value: real('value').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const mileageLogsDaily = pgTable('mileage_logs_daily', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  time: timestamp('time').notNull().unique(),
  value: real('value').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const mileageLogsMonthly = pgTable('mileage_logs_monthly', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  time: timestamp('time').notNull().unique(),
  value: real('value').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

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
