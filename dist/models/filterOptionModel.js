"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOptionModel = void 0;
const mongoose_1 = require("mongoose");
const filterOptionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["select", "range", "checkbox"],
        required: true,
    },
    options: {
        type: [String],
    },
    unit: {
        type: String,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, {
    timestamps: true,
});
exports.FilterOptionModel = (0, mongoose_1.model)("FilterOption", filterOptionSchema);
//# sourceMappingURL=filterOptionModel.js.map