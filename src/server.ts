import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import brandRoutes from "./routes/brandRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/category", categoryRoutes);

// Connect to Database
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Shopfinity Server with TypeScript and MongoDB!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
