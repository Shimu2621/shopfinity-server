"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.getProfile = exports.updateUser = exports.getMe = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const generateToken_1 = require("../utils/generateToken");
/*** ✅ Create User (Signup) */
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            res
                .status(400)
                .json({ message: "Name, email and password are required" });
            return;
        }
        // Check if user exists
        const existingUser = await userModel_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new userModel_1.User({
            name,
            email,
            password: hashedPassword,
            // ✅ Convert role to lowercase if provided
            role: role ? role.toLowerCase() : "user", // default to user
        });
        await user.save();
        const token = (0, generateToken_1.generateToken)(user._id.toString(), user.role || "user");
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        res
            .status(500)
            .json({ message: "Error creating user", error: error.message || error });
    }
};
exports.createUser = createUser;
/*** ✅ Login User */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = (await userModel_1.User.findOne({ email }));
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = password
            ? await bcrypt_1.default.compare(password, user.password)
            : false;
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = (0, generateToken_1.generateToken)(user._id.toString(), user.role || "user");
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
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
exports.loginUser = loginUser;
/*** ✅ GetMe User */
const getMe = async (req, res) => {
    try {
        if (!req.user || !("id" in req.user)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await userModel_1.User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
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
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
};
exports.getMe = getMe;
/*** ✅ Update User */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt_1.default.hash(updates.password, 10);
        }
        const user = (await userModel_1.User.findByIdAndUpdate(id, updates, {
            new: true,
        }));
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
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
exports.updateUser = updateUser;
/*** ✅ Get Profile */
const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = (await userModel_1.User.findById(id));
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
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};
exports.getProfile = getProfile;
/*** ✅ Get All Users (Admin Only) */
const getAllUsers = async (_req, res) => {
    try {
        const users = await userModel_1.User.find();
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
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel_1.User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map