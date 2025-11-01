import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Express Request type to include `user`
export interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

// ✅ Authenticate user
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", req.headers.authorization);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error });
  }
};

// ✅ Role-based authorization
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user as JwtPayload;
    if (!user || !roles.includes(user.role)) {
      res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
      return;
    }
    next();
  };
};
