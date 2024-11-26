import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", urlRoutes);
// Database connection
connectDB();

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

