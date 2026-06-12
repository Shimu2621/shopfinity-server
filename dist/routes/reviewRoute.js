"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const reviewController_1 = require("../controllers/reviewController");
const review_validation_1 = require("../validations/review.validation");
const router = express_1.default.Router();
// CREATE
router.post("/", (0, validateResource_1.default)(review_validation_1.createReviewSchema), reviewController_1.createReview);
// GET ALL
router.get("/", reviewController_1.getAllReviews);
// GET SINGLE
router.get("/:id", reviewController_1.getSingleReview);
// UPDATE
router.put("/:id", (0, validateResource_1.default)(review_validation_1.updateReviewSchema), reviewController_1.updateReview);
// DELETE
router.delete("/:id", reviewController_1.deleteReview);
exports.default = router;
//# sourceMappingURL=reviewRoute.js.map