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

router.post("/create-product", validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.put("/product/:id", validate(updateProductSchema), updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
