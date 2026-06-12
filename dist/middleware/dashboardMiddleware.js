"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardMiddleware = void 0;
const dashboardMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only.",
        });
    }
    next();
};
exports.dashboardMiddleware = dashboardMiddleware;
//# sourceMappingURL=dashboardMiddleware.js.map