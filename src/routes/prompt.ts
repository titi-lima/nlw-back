import { FastifyInstance } from "fastify";
import { PromptController } from "@controllers";

export async function PromptRouter(app: FastifyInstance) {
  app.get("/", PromptController.getAll);
}
