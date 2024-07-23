import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import records from "./routes/record.js";
import ticket from "./routes/ticketRoutes.js";
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import path from "path";
import { fileURLToPath } from 'url'

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const PORT = process.env.PORT || 5050;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/login", login);
app.use("/signup", signup);
app.use("/record", records);
app.use("/ticket", ticket);



// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
