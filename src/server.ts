// import express, { Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db";
// import { errorHandler } from "./middleware/errorHandler";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }),
// );

// app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// app.use(express.json());

// app.use(errorHandler);

// // Connect to Database
// connectDB();

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

// connect DB only for local dev
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
