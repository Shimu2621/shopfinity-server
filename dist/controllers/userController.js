"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getProfile = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*** ✅ Create new user (Signup) */
const createUser = async (req, res) => {
    try {
        const { name, email, password, avatarUrl, phone, address } = req.body;
        // Check if user already exists
        const existingUser = await userModel_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create user
        const newUser = new userModel_1.User({
            name,
            email,
            password: hashedPassword,
            avatarUrl,
            phone,
            address,
        });
        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
exports.createUser = createUser;
/*** ✅ Login user */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await userModel_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
exports.loginUser = loginUser;
/*** ✅ Update user profile */
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, avatarUrl, phone, address, password } = req.body;
        const updateData = { name, avatarUrl, phone, address };
        if (password) {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            updateData.password = hashedPassword;
        }
        const updatedUser = await userModel_1.User.findByIdAndUpdate(userId, updateData, {
            new: true,
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
exports.updateUser = updateUser;
/*** ✅ Get single user profile */
const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel_1.User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error });
    }
};
exports.getProfile = getProfile;
/*** ✅ Get all users (admin only) */
const getAllUsers = async (_req, res) => {
    try {
        const users = await userModel_1.User.find().select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userController.js.map