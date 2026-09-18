import { z } from "zod";
export const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    category: z.string().optional(),
    imageUrl: z.string().optional(),
    imagePublicId: z.string().optional(),
});
//# sourceMappingURL=posts.js.map