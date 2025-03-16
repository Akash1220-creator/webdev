import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config'; // Load environment variables

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Corrected: environment variable key should match your .env file
    api_key: process.env.CLOUD_API_KEY, // Corrected: Ensure correct case
    api_secret: process.env.CLOUD_SECRET_KEY
});
console.log("Connected to Cloudinary from fupload");

// Multer Cloudinary Storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => file.mimetype.split('/')[1], // Keep original format
        public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`
    },
});

export const cloudinaryFileUploader = multer({ storage });

// Export correctly
export default cloudinaryFileUploader;
