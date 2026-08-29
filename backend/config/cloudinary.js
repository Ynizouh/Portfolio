// ─────────────────────────────────────────────
//  config/cloudinary.js — Cloudinary + Multer
// ─────────────────────────────────────────────
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration du stockage Multer → Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio-projects", // Dossier sur Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [{ width: 1200, quality: "auto", fetch_format: "auto" }],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
