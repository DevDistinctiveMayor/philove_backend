import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";

export async function projectRoutes(app: FastifyInstance) {
  // Get all projects
  app.get("/projects", async () => {
    return prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  });


  // Get one project
  app.get("/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return reply.status(404).send({
        message: "Project not found",
      });
    }

    return project;
  });

  // Create project
  app.post("/projects", {
  preHandler: [authenticate],
}, async (request) => {
    const createProjectSchema = z.object({
      title: z.string().min(3),
      description: z.string().min(10),
      image: z.string().optional(),
    });

    const body = createProjectSchema.parse(request.body);

    return prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image ?? null,
      },
    });
  });

  // Update project
  app.put("/projects/:id", {
  preHandler: [authenticate],
}, async (request, reply) => {
    const { id } = request.params as { id: string };

    const updateProjectSchema = z.object({
      title: z.string().min(3).optional(),
      description: z.string().min(10).optional(),
      image: z.string().optional(),
    });

    const body = updateProjectSchema.parse(request.body);

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return reply.status(404).send({
        message: "Project not found",
      });
    }

    const data: {
      title?: string;
      description?: string;
      image?: string | null;
    } = {};

    if (body.title !== undefined) {
      data.title = body.title;
    }

    if (body.description !== undefined) {
      data.description = body.description;
    }

    if (body.image !== undefined) {
      data.image = body.image;
    }

    return prisma.project.update({
      where: { id },
      data,
    });
  });

  // Delete project
  app.delete("/projects/:id", {
  preHandler: [authenticate],
}, async (request, reply) => {
    const { id } = request.params as { id: string };

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return reply.status(404).send({
        message: "Project not found",
      });
    }

    await prisma.project.delete({
      where: { id },
    });

    return {
      message: "Project deleted successfully",
    };
  });
}