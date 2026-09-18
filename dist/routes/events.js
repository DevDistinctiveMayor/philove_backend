import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";
export async function eventRoutes(app) {
    // Get all events
    app.get("/events", async () => {
        return prisma.event.findMany({
            orderBy: {
                date: "desc",
            },
        });
    });
    // Get single event
    app.get("/events/:id", async (request, reply) => {
        const { id } = request.params;
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            return reply.status(404).send({
                message: "Event not found",
            });
        }
        return event;
    });
    // Create event
    app.post("/events", { preHandler: [authenticate] }, async (request) => {
        const createEventSchema = z.object({
            title: z.string().min(3),
            description: z.string().min(10),
            location: z.string().optional(),
            image: z.string().optional(),
            date: z.string(),
        });
        const body = createEventSchema.parse(request.body);
        return prisma.event.create({
            data: {
                title: body.title,
                description: body.description,
                location: body.location ?? null,
                image: body.image ?? null,
                date: new Date(body.date),
            },
        });
    });
    // Update event
    app.put("/events/:id", { preHandler: [authenticate] }, async (request, reply) => {
        const { id } = request.params;
        const updateEventSchema = z.object({
            title: z.string().min(3).optional(),
            description: z.string().min(10).optional(),
            location: z.string().optional(),
            image: z.string().optional(),
            date: z.string().optional(),
        });
        const body = updateEventSchema.parse(request.body);
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            return reply.status(404).send({
                message: "Event not found",
            });
        }
        const data = {};
        if (body.title !== undefined)
            data.title = body.title;
        if (body.description !== undefined)
            data.description = body.description;
        if (body.location !== undefined)
            data.location = body.location;
        if (body.image !== undefined)
            data.image = body.image;
        if (body.date !== undefined)
            data.date = new Date(body.date);
        return prisma.event.update({
            where: { id },
            data,
        });
    });
    // Delete event
    app.delete("/events/:id", { preHandler: [authenticate] }, async (request, reply) => {
        const { id } = request.params;
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            return reply.status(404).send({
                message: "Event not found",
            });
        }
        await prisma.event.delete({
            where: { id },
        });
        return {
            message: "Event deleted successfully",
        };
    });
}
//# sourceMappingURL=events.js.map