// config/db.js
const mongoose = require("mongoose");
const Admin = require("../models/Admin"); // Import Admin model
const bcrypt = require("bcryptjs");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");

    // Check if a super admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@dresscamp.com" });

    if (!existingAdmin) {
      // Create default super admin
      const hashedPassword = await bcrypt.hash("admin@123", 10);
      const superAdmin = new Admin({
        username: "Super Admin",
        email: "admin@dresscamp.com",
        password: hashedPassword,
        role: "superadmin",
      });

      await superAdmin.save();
      console.log("✅ Default Super Admin Created: admin@dresscamp.com / admin@123");
    } else {
      console.log("ℹ️ Super Admin already exists.");
    }
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
