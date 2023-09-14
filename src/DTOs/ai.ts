import { z } from "zod";

export const aiBody = z.object({
  videoId: z.string().transform((value) => Number(value)),
  template: z.string(),
  temperature: z.number().min(0).max(1).default(0.5),
});
