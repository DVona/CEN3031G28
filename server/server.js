import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/connection.js";
import records from "./routes/record.js";
import ticket from "./routes/ticketRoutes.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/record", records);
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
