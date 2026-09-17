import type { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

export async function authRoutes(app: FastifyInstance) {
  // Register Admin
  app.post("/auth/register", async (request) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  });

  // Login Admin
  app.post("/auth/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply.status(401).send({
        message: "Invalid credentials",
      });
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValid) {
      return reply.status(401).send({
        message: "Invalid credentials",
      });
    }

    const token = await reply.jwtSign({
      userId: user.id,
      role: user.role,
    });

    return { token };
  });
}