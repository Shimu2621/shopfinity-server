"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: "Validation Error",
            errors: error.errors,
        });
    }
};
exports.default = validateResource;
//# sourceMappingURL=validateResource.js.map