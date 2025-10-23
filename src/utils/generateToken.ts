import jwt from "jsonwebtoken";

export const generateToken = (id: string, role: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { id, role }, // payload
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // token valid for 7 days
  );
};
