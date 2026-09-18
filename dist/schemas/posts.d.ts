import { z } from "zod";
export declare const createPostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    imagePublicId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=posts.d.ts.map