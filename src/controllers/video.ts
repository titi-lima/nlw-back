import { UpdateVideoParams, UpdateVideoBody } from "./../DTOs/video";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import fs, { createReadStream } from "fs";
import { VideoRepository } from "@repositories";
import { openai } from "src/lib/openai";

const pump = promisify(pipeline);

class VideoController {
  async uploadVideo(req: FastifyRequest, res: FastifyReply) {
    const data = await req.file();

    if (!data) {
      return res.status(400).send({ message: "missing file input" });
    }

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return res
        .status(400)
        .send({ message: "Invalid type. Please upload an mp3 file." });
    }
    const fileBaseName = path.basename(data.filename, extension);
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
    const uploadDest = path.resolve(__dirname, "../../tmp", fileUploadName);

    await pump(data.file, fs.createWriteStream(uploadDest));

    const video = await VideoRepository.create({
      name: data.filename,
      path: uploadDest,
    });

    return res.status(200).send({ message: "Video uploaded!", data: video });
  }

  async addTranscription(req: FastifyRequest, res: FastifyReply) {
    const [{ videoId }, { prompt }] = await Promise.all([
      UpdateVideoParams.parseAsync(req.params),
      UpdateVideoBody.parseAsync(req.body),
    ]);

    const path = await VideoRepository.getPath(videoId);
    const audioReadStream = createReadStream(path);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    const video = await VideoRepository.update(videoId, {
      transcript: response.text,
    });

    return res
      .status(200)
      .send({ message: "Transcription added!", data: response.text });
  }
}

export default new VideoController();
