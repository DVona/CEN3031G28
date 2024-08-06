import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/connection.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import eventRoutes from "./routes/event.routes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// confirmed working
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/event", eventRoutes);

connectDB();

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// middleware for error handling
// adapted from: https://github.com/sahandghavidel/mern-blog/tree/main
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
