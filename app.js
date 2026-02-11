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

// Local Modules
import { page404 } from "./controllers/error.js";
import storeRouter from "./routes/storeRouter.js";
import hostRouter from "./routes/hostRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

dotenv.config();

app.set("view engine", "ejs");
app.set("views", "views");

const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

// Auth helper middleware
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
