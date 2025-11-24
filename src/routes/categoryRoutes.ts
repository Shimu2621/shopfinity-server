import express from "express";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = express.Router();

//  Create
router.post("/create-category", createCategory);

//  Get all
router.get("/", getAllCategories);

//  Get single
router.get("/:id", getSingleCategory);

//  Update
router.put("/:id", updateCategory);

//  Delete
router.delete("/:id", deleteCategory);

export default router;
