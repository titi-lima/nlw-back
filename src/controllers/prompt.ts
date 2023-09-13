import { PromptRepository } from "@repositories";
import { type FastifyReply, type FastifyRequest } from "fastify";

class PromptController {
  async getAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const prompts = await PromptRepository.getAll();
      if (!prompts?.length) {
        return res.status(204).send();
      }
      return res.status(200).send(prompts);
    } catch (err) {
      return err;
    }
  }
}

export default new PromptController();
