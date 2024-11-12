const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");
const weatherRoutes = require("./routes/weatherRoutes.js");

const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

const frontendUrl = (
  process.env.FRONTEND_URL || "http://localhost:5173"
).trim();

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
