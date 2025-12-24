import { Router } from "express";
import {
  createProductSpecification,
  getProductSpecifications,
  getProductSpecification,
  updateProductSpecification,
  deleteProductSpecification,
} from "../controllers/productSpecificationController";

const router = Router();

router.post("/", createProductSpecification);
router.get("/", getProductSpecifications);
router.get("/:id", getProductSpecification);
router.put("/:id", updateProductSpecification);
router.delete("/:id", deleteProductSpecification);

export default router;
