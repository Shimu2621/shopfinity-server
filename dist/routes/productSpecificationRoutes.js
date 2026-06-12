"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productSpecificationController_1 = require("../controllers/productSpecificationController");
const router = (0, express_1.Router)();
router.post("/", productSpecificationController_1.createProductSpecification);
// ✅ bulk create
router.post("/bulk", productSpecificationController_1.createProductSpecificationsBulk);
router.get("/", productSpecificationController_1.getProductSpecifications);
router.get("/product/:productId", productSpecificationController_1.getSpecificationsByProductId);
router.get("/:id", productSpecificationController_1.getProductSpecification);
router.put("/:id", productSpecificationController_1.updateProductSpecification);
router.delete("/:id", productSpecificationController_1.deleteProductSpecification);
exports.default = router;
//# sourceMappingURL=productSpecificationRoutes.js.map