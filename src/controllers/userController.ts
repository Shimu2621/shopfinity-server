import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { IUser } from "../interfaces/user.interface";
import { generateToken } from "../utils/generateToken";
import { Types } from "mongoose";

/*** ✅ Create User (Signup) */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      // ✅ Convert role to lowercase if provided
      role: role ? role.toLowerCase() : "user", // default to user
    });

    await user.save();

    const token = generateToken(user._id.toString(), user.role || "user");

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message || error });
  }
};

/*** ✅ Login User */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = (await User.findOne({ email })) as IUser | null;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = password
      ? await bcrypt.compare(password, user.password!)
      : false;
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString(), user.role || "user");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

/*** ✅ Update User */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = (await User.findByIdAndUpdate(id, updates, {
      new: true,
    })) as IUser | null;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

/*** ✅ Get Profile */
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = (await User.findById(id)) as IUser | null;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

/*** ✅ Get All Users (Admin Only) */
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();

    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      address: user.address,
    }));

    res.status(200).json({ users: formattedUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
