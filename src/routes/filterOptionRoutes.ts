import { Router } from "express";
import {
  createFilterOption,
  getFilterOptionsByCategory,
  getFilterOption,
  updateFilterOption,
  deleteFilterOption,
  getFilterOptions,
} from "../controllers/filterOptionController";

const router = Router();

router.post("/", createFilterOption);
router.get("/", getFilterOptionsByCategory);
router.get("/filter-options", getFilterOptions);
router.get("/:id", getFilterOption);
router.patch("/:id", updateFilterOption);
router.delete("/:id", deleteFilterOption);

export default router;
