import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
// routes file
import connectDatabase from "./config/db.js";

// dotenv config
dotenv.config();

// database connection
connectDatabase();

export const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`APP is running on port ${PORT}`.bgMagenta.black);
});

//fizz.oncemore
