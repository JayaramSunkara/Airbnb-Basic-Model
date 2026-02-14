// Core Modules
import path from "path";
import { fileURLToPath } from "url";

// External Modules
import express from "express";

// Local Modules
import { page404 } from "./controllers/error.js";
import storeRouter from "./routes/storeRouter.js";
import hostRouter from "./routes/hostRouter.js";
import authRouter from "./routes/authRouter.js";
import "./configs/env.js";
import connectDB from "./configs/db.js";
import upload from "./configs/multer.js";
import sessionConfig from "./configs/session.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Static */
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* View Engine */
app.set("view engine", "ejs");
app.set("views", "views");

/* Body parser */
app.use(express.urlencoded({ extended: true }));

/* Multer */
app.use(upload.single("photo"));

/* Session */
app.use(sessionConfig);

/* Auth helper middleware */
app.use((req, res, next) => {
  req.isLoggedIn = Boolean(req.session.isLoggedIn);
  next();
});

/* Routes */
app.use(authRouter);
app.use(storeRouter);

app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) return next();
  res.redirect("/login");
});

app.use("/host", hostRouter);

/* 404 */
app.use(page404);

/* DB + Server */
await connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
