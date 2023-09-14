import { VideoRepository } from "@repositories";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { aiBody } from "src/DTOs/ai";
import { openai } from "src/lib/openai";

class AIController {
  async complete(req: FastifyRequest, res: FastifyReply) {
    try {
      const body = aiBody.parse(req.body);
      const transcription = await VideoRepository.getTranscription(
        body.videoId
      );
      if (!transcription) {
        return res.status(404).send({ message: "No transcription found" });
      }

      const promptMessage = body.template.replace(
        "{transcription}",
        transcription
      );

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",

        temperature: body.temperature,
        messages: [
          {
            role: "user",
            content: promptMessage,
          },
        ],
      });

      return res.status(200).send({ message: "AI generated!", data: response });
    } catch (err) {
      return err;
    }
  }
}

export default new AIController();
