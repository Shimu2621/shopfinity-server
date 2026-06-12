"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const user_validation_1 = require("../validations/user.validation");
const router = express_1.default.Router();
// Public routes
router.post("/signup", (0, validateResource_1.default)(user_validation_1.createUserSchema), userController_1.createUser);
router.post("/signin", (0, validateResource_1.default)(user_validation_1.loginSchema), userController_1.loginUser);
// Protected routes
router.put("/update/:id", (0, validateResource_1.default)(user_validation_1.updateUserSchema), authMiddleware_1.authMiddleware, userController_1.updateUser);
router.get("/profile/:id", authMiddleware_1.authMiddleware, userController_1.getProfile);
// Admin-only route
router.get("/all", authMiddleware_1.authMiddleware, (0, authMiddleware_1.authorizeRoles)("admin"), userController_1.getAllUsers);
router.get("/me", authMiddleware_1.authMiddleware, userController_1.getMe);
router.delete("/delete/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.authorizeRoles)("admin"), userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map