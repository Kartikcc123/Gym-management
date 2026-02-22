const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/* ======================
   Middleware
====================== */
app.use(
  cors({
    origin: ["https://gym-management-3-nbyv.onrender.com"], // React / Vite frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ======================
   Routes
====================== */

// Auth Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));

/* ======================
   Health Check
====================== */
app.get("/", (req, res) => {
  res.status(200).send("IronForge Gym API is running 🚀");
});

/* ======================
   Error fallback
====================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/* ======================
   Server
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
