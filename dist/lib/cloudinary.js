import { v2 as cloudinary } from "cloudinary";
function getEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}
cloudinary.config({
    cloud_name: getEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: getEnv("CLOUDINARY_API_KEY"),
    api_secret: getEnv("CLOUDINARY_API_SECRET"),
});
export default cloudinary;
//# sourceMappingURL=cloudinary.js.map