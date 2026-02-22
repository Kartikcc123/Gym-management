const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

/* ======================
   CORS CONFIG
====================== */
app.use(
  cors({
    origin: [
      "https://gym-management-3-nbyv.onrender.com", // Production frontend
      "http://localhost:5173", // Local Vite dev
    ],
    credentials: true,
  })
);

/* ======================
   BODY PARSER
====================== */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ======================
   ROUTES
====================== */

// Auth Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.status(200).send("🚀 IronForge Gym API Running");
});

/* ======================
   404 FALLBACK
====================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});