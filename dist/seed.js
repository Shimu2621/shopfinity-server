"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./config/db");
const userModel_1 = require("./models/userModel");
dotenv_1.default.config();
const seedUsers = async () => {
    try {
        // ✅ Connect DB
        await (0, db_1.connectDB)();
        // ❌ DO NOT delete users unless you really want to
        // await User.deleteMany();
        // ✅ Check if admin exists
        const adminExists = await userModel_1.User.findOne({ role: "admin" });
        if (!adminExists) {
            const hashedPassword = await bcrypt_1.default.hash("Admin@123", 10);
            await userModel_1.User.create({
                name: "Admin",
                email: "admin@admin.com",
                password: hashedPassword,
                role: "admin",
            });
            console.log("✅ Admin user created");
        }
        else {
            console.log("ℹ️ Admin already exists");
        }
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};
seedUsers();
//# sourceMappingURL=seed.js.map