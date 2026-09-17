import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { createPostSchema } from "../schemas/posts.js";
export async function postRoutes(app) {
    app.post("/posts", { preHandler: [authenticate] }, async (request, reply) => {
        const body = createPostSchema.parse(request.body);
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                category: body.category,
                imageUrl: body.imageUrl,
                imagePublicId: body.imagePublicId,
                authorId: request.user.userId,
            },
        });
        return reply.status(201).send(post);
    });
}
//# sourceMappingURL=posts.js.map