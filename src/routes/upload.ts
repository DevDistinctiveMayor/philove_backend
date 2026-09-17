import type { FastifyInstance } from "fastify";
import cloudinary from "../lib/cloudinary.js";
import { authenticate } from "../middleware/auth.js";

export async function uploadRoutes(app: FastifyInstance) {
  app.post(
    "/upload",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const file = await request.file();

      if (!file) {
        return reply.status(400).send({
          message: "No file uploaded",
        });
      }

      const buffer = await file.toBuffer();

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "philove",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }
  );
}