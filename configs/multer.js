// configs/multer.js

import path from "path";
import multer from "multer";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uploads folder should be relative to project root
const uploadDir = path.join(__dirname, "..", "uploads");

/* Generate secure random filename */
const generateId = (size = 16) => crypto.randomBytes(size).toString("hex");

/* Storage config */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = generateId();
    cb(null, `${name}${ext}`);
  },
});

/* File filter */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only images allowed"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export default upload;
