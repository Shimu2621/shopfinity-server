import { Router } from "express";
import {
  createFilterOption,
  getFilterOptions,
  getFilterOption,
  updateFilterOption,
  deleteFilterOption,
} from "../controllers/filterOptionController";

const router = Router();

router.post("/", createFilterOption);
router.get("/", getFilterOptions);
router.get("/:id", getFilterOption);
router.patch("/:id", updateFilterOption);
router.delete("/:id", deleteFilterOption);

export default router;
