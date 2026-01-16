import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import brandRoutes from "./routes/brandRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoute";
import reviewRoutes from "./routes/reviewRoute";
import orderRoutes from "./routes/orderRoutes";
import productQuestionRoutes from "./routes/productQuestionRoutes";
import productAnswerRoutes from "./routes/productAnswerRoute";
import productSpecificationRoutes from "./routes/productSpecificationRoutes";
import cartRoutes from "./routes/cartRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import filterOptionRoutes from "./routes/filterOptionRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/product-questions", productQuestionRoutes);
app.use("/api/product-answers", productAnswerRoutes);
app.use("/api/product-specifications", productSpecificationRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/filter-option", filterOptionRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

// Welcome Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Shopfinity Server with TypeScript and MongoDB!");
});

app.use(errorHandler);

// Connect to Database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
