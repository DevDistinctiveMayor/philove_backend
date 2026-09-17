import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";

export async function galleryRoutes(app: FastifyInstance) {
  // Public - Get all gallery items
  app.get("/gallery", async () => {
    return prisma.gallery.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  });

  // Public - Get one gallery item
  app.get("/gallery/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const item = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!item) {
      return reply.status(404).send({
        message: "Gallery item not found",
      });
    }

    return item;
  });

  // Admin - Create gallery item
  app.post(
    "/gallery",
    { preHandler: [authenticate] },
    async (request) => {
      const schema = z.object({
        title: z.string().min(3),
        description: z.string().optional(),
        imageUrl: z.string().url(),
        category: z.string().optional(),
      });

      const body = schema.parse(request.body);

      return prisma.gallery.create({
        data: {
          title: body.title,
          description: body.description ?? null,
          imageUrl: body.imageUrl,
          category: body.category ?? null,
        },
      });
    }
  );

  // Admin - Update gallery item
  app.put(
    "/gallery/:id",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const schema = z.object({
        title: z.string().min(3).optional(),
        description: z.string().optional(),
        imageUrl: z.string().url().optional(),
        category: z.string().optional(),
      });

      const body = schema.parse(request.body);

      const item = await prisma.gallery.findUnique({
        where: { id },
      });

      if (!item) {
        return reply.status(404).send({
          message: "Gallery item not found",
        });
      }

      const data: {
        title?: string;
        description?: string | null;
        imageUrl?: string;
        category?: string | null;
      } = {};

      if (body.title !== undefined) data.title = body.title;
      if (body.description !== undefined) data.description = body.description;
      if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
      if (body.category !== undefined) data.category = body.category;

      return prisma.gallery.update({
        where: { id },
        data,
      });
    }
  );

  // Admin - Delete gallery item
  app.delete(
    "/gallery/:id",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const item = await prisma.gallery.findUnique({
        where: { id },
      });

      if (!item) {
        return reply.status(404).send({
          message: "Gallery item not found",
        });
      }

      await prisma.gallery.delete({
        where: { id },
      });

      return {
        message: "Gallery item deleted successfully",
      };
    }
  );
}