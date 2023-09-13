import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";

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

    return res.status(200).send({ message: "Video uploaded!" });
  }
}

export default new VideoController();
