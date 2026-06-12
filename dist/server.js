"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const errorHandler_1 = require("./middleware/errorHandler");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const reviewRoute_1 = __importDefault(require("./routes/reviewRoute"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const productQuestionRoutes_1 = __importDefault(require("./routes/productQuestionRoutes"));
const productAnswerRoute_1 = __importDefault(require("./routes/productAnswerRoute"));
const productSpecificationRoutes_1 = __importDefault(require("./routes/productSpecificationRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const filterOptionRoutes_1 = __importDefault(require("./routes/filterOptionRoutes"));
const wishlistRoutes_1 = __importDefault(require("./routes/wishlistRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/api/payment/webhook", express_1.default.raw({ type: "application/json" }));
app.use(express_1.default.json());
//Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/brands", brandRoutes_1.default);
app.use("/api/categories", categoryRoutes_1.default);
app.use("/api/products", productRoute_1.default);
app.use("/api/reviews", reviewRoute_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/product-questions", productQuestionRoutes_1.default);
app.use("/api/product-answers", productAnswerRoute_1.default);
app.use("/api/product-specifications", productSpecificationRoutes_1.default);
app.use("/api/cart", cartRoutes_1.default);
app.use("/api/payment", paymentRoutes_1.default);
app.use("/api/filter-option", filterOptionRoutes_1.default);
app.use("/api/wishlist", wishlistRoutes_1.default);
app.use("/api/admin/dashboard", dashboardRoutes_1.default);
// Welcome Route
app.get("/", (req, res) => {
    res.send("Welcome to Shopfinity Server with TypeScript and MongoDB!");
});
app.use(errorHandler_1.errorHandler);
// Connect to Database
(0, db_1.connectDB)();
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map