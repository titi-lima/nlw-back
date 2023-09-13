import { FastifyInstance } from "fastify";
import { PromptRouter } from "./prompt";
import { VideoRouter } from "./video";

export async function appRoutes(app: FastifyInstance) {
  app.register(PromptRouter, { prefix: "/prompts" });
  app.register(VideoRouter, { prefix: "/videos" });
}
