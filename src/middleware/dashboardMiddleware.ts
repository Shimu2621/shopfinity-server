// src/middleware/dashboardMiddleware.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }
  next();
};
