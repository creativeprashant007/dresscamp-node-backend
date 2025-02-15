const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes");
console.log("JWT Secret:", process.env.JWT_SECRET);

// Use Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("✅ DressCamp API is running...");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("🚀 Server running on port ${PORT}"));