"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const category_validation_1 = require("../validations/category.validation");
const router = express_1.default.Router();
//  Create
router.post("/", (0, validateResource_1.default)(category_validation_1.createCategorySchema), categoryController_1.createCategory);
//  Get all
router.get("/", categoryController_1.getAllCategories);
//  Get single
router.get("/:id", (0, validateResource_1.default)(category_validation_1.getSingleCategorySchema), categoryController_1.getSingleCategory);
//  Update
router.put("/:id", (0, validateResource_1.default)(category_validation_1.updateCategorySchema), categoryController_1.updateCategory);
//  Delete
router.delete("/:id", (0, validateResource_1.default)(category_validation_1.deleteCategorySchema), categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map