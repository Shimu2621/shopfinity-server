import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateResource =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: "Validation Error",
        errors: error.errors,
      });
    }
  };

export default validateResource;
