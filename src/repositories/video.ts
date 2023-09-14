import { Video, db } from "@db";
import { eq } from "drizzle-orm";

type InsertVideo = typeof Video.$inferInsert;
type UpdateVideo = Partial<InsertVideo>;
class VideoRepository {
  static async create(data: InsertVideo) {
    return await db.insert(Video).values(data).returning();
  }

  static async update(id: number, data: UpdateVideo) {
    return await db.update(Video).set(data).where(eq(Video.id, id)).returning();
  }

  static async getPath(id: number) {
    return (
      await db.select({ path: Video.path }).from(Video).where(eq(Video.id, id))
    )?.[0]?.path;
  }

  static async getTranscription(id: number) {
    return (
      await db
        .select({ transcript: Video.transcript })
        .from(Video)
        .where(eq(Video.id, id))
    )?.[0]?.transcript;
  }
}

export default VideoRepository;
