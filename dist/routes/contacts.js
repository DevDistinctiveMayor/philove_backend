import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";
export async function contactRoutes(app) {
    // Public contact form
    app.post("/contacts", async (request) => {
        const contactSchema = z.object({
            name: z.string().min(2),
            email: z.email(),
            subject: z.string().optional(),
            message: z.string().min(10),
        });
        const body = contactSchema.parse(request.body);
        return prisma.contact.create({
            data: {
                name: body.name,
                email: body.email,
                subject: body.subject ?? null,
                message: body.message,
            },
        });
    });
    // Admin view all messages
    app.get("/contacts", { preHandler: [authenticate] }, async () => {
        return prisma.contact.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    });
    // Mark message as read
    app.patch("/contacts/:id/read", { preHandler: [authenticate] }, async (request, reply) => {
        const { id } = request.params;
        const contact = await prisma.contact.findUnique({
            where: { id },
        });
        if (!contact) {
            return reply.status(404).send({
                message: "Message not found",
            });
        }
        return prisma.contact.update({
            where: { id },
            data: {
                isRead: true,
            },
        });
    });
}
//# sourceMappingURL=contacts.js.map