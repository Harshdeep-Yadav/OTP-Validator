import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// config
dotenv.config();

// rest api
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// rest api's
app.get("/", (req, res) => {
  res.send("Welcome to server help (backend)");
});

// PORT
const PORT = process.env.PORT || 8080;

//listening

app.listen(PORT, (req, res) => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode at port ${PORT} 😎`
  );
});
