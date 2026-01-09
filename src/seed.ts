import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { connectDB } from "./config/db";
import { User } from "./models/userModel";

dotenv.config();

const seedUsers = async () => {
  try {
    // ✅ Connect DB
    await connectDB();

    // ❌ DO NOT delete users unless you really want to
    // await User.deleteMany();

    // ✅ Check if admin exists
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await User.create({
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin already exists");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedUsers();
