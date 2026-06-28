import cors from "cors";
import express, { Request, Response } from "express";
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
import { errorHandler } from "./middleware/errorHandler";
import { ProductModel } from "./models/productModel";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.CLIENT_URL || ""],
    credentials: true,
  }),
);

app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

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

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const count = await ProductModel.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
});

app.use(errorHandler);

export default app;
