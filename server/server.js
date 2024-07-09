import express from "express";
import cors from "cors";
import connectDB from "./database/connection.js";
import records from "./routes/record.js";
import login from "./routes/login.js";
import signup from "./routes/signup.js";

// const PORT = process.env.PORT || 5000; 
// does not work on my macbook, changing here
const PORT = 5001;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/login", login);
app.use("/signup", signup);
app.use("/record", records);

connectDB();

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
