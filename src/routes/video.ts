import { FastifyInstance } from "fastify";
import { VideoController } from "@controllers";
import fastifyMultipart from "@fastify/multipart";

export async function VideoRouter(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25,
    },
  });
  app.post("/", VideoController.uploadVideo);
  app.post("/:videoId/transcription", VideoController.addTranscription);
}
