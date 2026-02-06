// Core Modules
import path from "path";
import { fileURLToPath } from "url";

// External Modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Local Modules
import { page404 } from "./controllers/error.js";
import storeRouter from "./routes/storeRouter.js";
import hostRouter from "./routes/hostRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(__dirname, "public")));

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
