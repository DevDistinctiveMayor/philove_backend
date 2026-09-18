import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";
export async function dashboardRoutes(app) {
    app.get("/dashboard", { preHandler: [authenticate] }, async () => {
        const [projects, events, volunteers, contacts, unreadMessages,] = await Promise.all([
            prisma.project.count(),
            prisma.event.count(),
            prisma.volunteer.count(),
            prisma.contact.count(),
            prisma.contact.count({
                where: {
                    isRead: false,
                },
            }),
        ]);
        return {
            projects,
            events,
            volunteers,
            contacts,
            unreadMessages,
        };
    });
}
//# sourceMappingURL=dashboard.js.map