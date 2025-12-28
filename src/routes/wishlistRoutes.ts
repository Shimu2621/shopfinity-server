import { Router } from "express";
import {
  createWishlist,
  getWishlist,
  getAllWishlist,
  deleteWishlistItem,
} from "../controllers/wishlistController";

const router = Router();

router.post("/", createWishlist);
router.get("/all", getAllWishlist); // admin
router.get("/", getWishlist); // user
router.delete("/:userId/:productId", deleteWishlistItem);

export default router;
