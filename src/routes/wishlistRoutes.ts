import { Router } from "express";
import {
  createWishlist,
  getWishlist,
  getAllWishlist,
  deleteWishlistItem,
} from "../controllers/wishlistController";

const router = Router();

router.post("/", createWishlist);

router.get("/user", getWishlist); // user wishlist
router.get("/admin", getAllWishlist); // admin wishlist
router.delete("/:userId/:productId", deleteWishlistItem);

export default router;
