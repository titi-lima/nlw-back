import { FastifyInstance } from "fastify";
import { AIController } from "@controllers";
import fastifyMultipart from "@fastify/multipart";

export async function AIRouter(app: FastifyInstance) {
  app.post("/complete", AIController.complete);
}
