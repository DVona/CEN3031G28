import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/connection.js";
import ticket from "./routes/ticketRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
// app.use(express.json()); Removing this because it for some reason limits payload size for web requests 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use("/ticket", ticket);

// confirmed working
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

connectDB();

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// middleware for error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
