import express from "express";
import {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController";

const router = express.Router();

router.post("/", createBrand); // ➕ Create
router.get("/", getAllBrands); // 📜 Get all
router.get("/:id", getSingleBrand); // 🔍 Get single
router.put("/:id", updateBrand); // ✏️ Update
router.delete("/:id", deleteBrand); // ❌ Delete

export default router;
