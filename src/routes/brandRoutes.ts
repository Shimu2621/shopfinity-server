import express from "express";
import {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController";
import validate from "../middleware/validateResource";
import {
  createBrandSchema,
  deleteBrandSchema,
  getSingleBrandSchema,
  updateBrandSchema,
} from "../validations/brand.validation";

const router = express.Router();

router.post("/create-brand", validate(createBrandSchema), createBrand); // ➕ Create
router.get("/", getAllBrands); // 📜 Get all
router.get("/:id", validate(getSingleBrandSchema), getSingleBrand); // 🔍 Get single
router.put("/:id", validate(updateBrandSchema), updateBrand); // ✏️ Update
router.delete("/:id", validate(deleteBrandSchema), deleteBrand); // ❌ Delete

export default router;
