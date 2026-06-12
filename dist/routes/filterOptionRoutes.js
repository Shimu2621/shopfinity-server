"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filterOptionController_1 = require("../controllers/filterOptionController");
const router = (0, express_1.Router)();
router.post("/", filterOptionController_1.createFilterOption);
router.get("/", filterOptionController_1.getFilterOptionsByCategory);
router.get("/filter-options", filterOptionController_1.getFilterOptions);
router.get("/:id", filterOptionController_1.getFilterOption);
router.patch("/:id", filterOptionController_1.updateFilterOption);
router.delete("/:id", filterOptionController_1.deleteFilterOption);
exports.default = router;
//# sourceMappingURL=filterOptionRoutes.js.map