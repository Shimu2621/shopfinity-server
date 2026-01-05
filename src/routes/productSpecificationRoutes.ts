import { Router } from "express";
import {
  createProductSpecification,
  createProductSpecificationsBulk,
  getProductSpecifications,
  getProductSpecification,
  updateProductSpecification,
  deleteProductSpecification,
  getSpecificationsByProductId,
} from "../controllers/productSpecificationController";

const router = Router();

router.post("/", createProductSpecification);
// ✅ bulk create
router.post("/bulk", createProductSpecificationsBulk);
router.get("/", getProductSpecifications);
router.get("/product/:productId", getSpecificationsByProductId);
router.get("/:id", getProductSpecification);
router.put("/:id", updateProductSpecification);
router.delete("/:id", deleteProductSpecification);

export default router;
