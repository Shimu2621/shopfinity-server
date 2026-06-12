"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../controllers/brandController");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const brand_validation_1 = require("../validations/brand.validation");
const router = express_1.default.Router();
router.post("/", (0, validateResource_1.default)(brand_validation_1.createBrandSchema), brandController_1.createBrand); // Create
router.get("/", brandController_1.getAllBrands); //Get all
router.get("/:id", (0, validateResource_1.default)(brand_validation_1.getSingleBrandSchema), brandController_1.getSingleBrand); // Get single
router.put("/:id", (0, validateResource_1.default)(brand_validation_1.updateBrandSchema), brandController_1.updateBrand); //  Update
router.delete("/:id", (0, validateResource_1.default)(brand_validation_1.deleteBrandSchema), brandController_1.deleteBrand); //  Delete
exports.default = router;
//# sourceMappingURL=brandRoutes.js.map