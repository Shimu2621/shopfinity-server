import express from "express";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import validate from "../middleware/validateResource";

import { createCategorySchema } from "../validations/category.validation";
import { updateCategorySchema } from "../validations/category.validation";
import { deleteCategorySchema } from "../validations/category.validation";
import { getSingleCategorySchema } from "../validations/category.validation";

const router = express.Router();

//  Create
router.post("/create-category", validate(createCategorySchema), createCategory);

//  Get all
router.get("/", getAllCategories);

//  Get single
router.get(
  "/single-category/:id",
  validate(getSingleCategorySchema),
  getSingleCategory
);

//  Update
router.put(
  "/update-category/:id",
  validate(updateCategorySchema),
  updateCategory
);

//  Delete
router.delete(
  "/delete-category/:id",
  validate(deleteCategorySchema),
  deleteCategory
);

export default router;
