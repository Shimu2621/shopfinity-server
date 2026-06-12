"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const product_validation_1 = require("../validations/product.validation");
const router = express_1.default.Router();
router.post("/", (0, validateResource_1.default)(product_validation_1.createProductSchema), productController_1.createProduct);
router.get("/", productController_1.getAllProducts);
router.get("/featured-categories", productController_1.getFeaturedCategoryProducts);
router.get("/:id", productController_1.getSingleProduct);
router.put("/:id", (0, validateResource_1.default)(product_validation_1.updateProductSchema), productController_1.updateProduct);
router.delete("/:id", productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoute.js.map