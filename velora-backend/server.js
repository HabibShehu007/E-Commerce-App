const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const db = require("./db/connection"); // MySQL connection

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // Live Server origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.static("public")); // Serve frontend assets like HTML, CSS, JS

// ✅ Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const orderRoutes = require("./routes/orderRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/orders", orderRoutes);


// ✅ Health Check
app.get("/", (req, res) => {
  res.send("✅ Velora backend is up and running!");
});

// ✅ Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
