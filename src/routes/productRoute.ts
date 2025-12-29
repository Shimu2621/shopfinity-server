import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import validate from "../middleware/validateResource";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation";

const router = express.Router();

router.post("/", validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
