import Fastify from "fastify";
import { projectRoutes } from "./routes/projects.js";
import jwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth.js";
import { eventRoutes } from "./routes/events.js";
import { volunteerRoutes } from "./routes/volunteers.js";
import { contactRoutes } from "./routes/contacts.js";
import { dashboardRoutes } from "./routes/dashboard.js";
import { galleryRoutes } from "./routes/gallery.js";
import multipart from "@fastify/multipart";
import { uploadRoutes } from "./routes/upload.js";
import { postRoutes } from "./routes/posts.js";
const app = Fastify();
await app.register(jwt, {
    secret: process.env.JWT_SECRET || "change-this-in-production",
});
await app.register(postRoutes);
app.register(authRoutes, {
    prefix: "/api",
});
app.register(eventRoutes, {
    prefix: "/api",
});
app.register(volunteerRoutes, {
    prefix: "/api",
});
app.register(contactRoutes, {
    prefix: "/api",
});
app.register(dashboardRoutes, {
    prefix: "/api",
});
app.register(galleryRoutes, {
    prefix: "/api",
});
await app.register(multipart);
app.register(uploadRoutes, {
    prefix: "/api",
});
app.register(projectRoutes, {
    prefix: "/api",
});
app.get("/", async () => {
    return {
        message: "Philove API running",
    };
});
try {
    await app.listen({
        port: 5000,
        host: "0.0.0.0",
    });
    console.log("🚀 Server running on http://localhost:5000");
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}
//# sourceMappingURL=server.js.map