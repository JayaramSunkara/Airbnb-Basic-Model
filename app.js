// Core Modules
import path from "path";
import { fileURLToPath } from "url";

// External Modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import multer from "multer";
import crypto from "crypto";

// Local Modules
import { page404 } from "./controllers/error.js";
import storeRouter from "./routes/storeRouter.js";
import hostRouter from "./routes/hostRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "..", "uploads");

app.use(express.static(path.join(__dirname, "public")));

dotenv.config();

app.set("view engine", "ejs");
app.set("views", "views");

const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

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

/* Multer config */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(upload.single("photo"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/host/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/homes/uploads", express.static(path.join(__dirname, "uploads")));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

// Auth helper middleware (Syntax sugar and nothing else)
app.use((req, res, next) => {
  req.isLoggedIn = Boolean(req.session.isLoggedIn);
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(page404);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to DB: ", error.message);
  }
}

startServer();
