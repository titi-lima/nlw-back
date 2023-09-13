import { db } from "../db/db";
import { Prompt } from "../db/schema";

class PromptRepository {
  static async getAll() {
    return await db.select().from(Prompt);
  }
}

export default PromptRepository;
