import { z } from "zod";

export const UpdateVideoBody = z.object({
  prompt: z.string(),
});

export const UpdateVideoParams = z.object({
  videoId: z.string().transform((value) => Number(value)),
});
