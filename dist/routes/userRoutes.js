"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public routes
router.post("/signup", userController_1.createUser);
router.post("/signin", userController_1.loginUser);
// Protected routes
router.put("/update/:id", authMiddleware_1.authMiddleware, userController_1.updateUser);
router.get("/profile/:id", authMiddleware_1.authMiddleware, userController_1.getProfile);
// Admin-only route
router.get("/all", authMiddleware_1.authMiddleware, (0, authMiddleware_1.authorizeRoles)("admin"), userController_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map