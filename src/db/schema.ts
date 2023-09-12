import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const video = sqliteTable("video", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  path: text("path").notNull(),
  transcript: text("transcript"),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date(Date.now())),
});

export const prompt = sqliteTable("prompt", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  template: text("template").notNull(),
});
