import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";

export async function volunteerRoutes(app: FastifyInstance) {
  // Public volunteer application
  app.post("/volunteers", async (request) => {
    const volunteerSchema = z.object({
      fullName: z.string().min(3),
      email: z.email(),
      phone: z.string().optional(),
      skills: z.string().optional(),
      motivation: z.string().optional(),
    });

    const body = volunteerSchema.parse(request.body);

    return prisma.volunteer.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone ?? null,
        skills: body.skills ?? null,
        motivation: body.motivation ?? null,
      },
    });
  });

  // Admin view all volunteers
  app.get(
    "/volunteers",
    { preHandler: [authenticate] },
    async () => {
      return prisma.volunteer.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }
  );
}