import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// routes file
import rootRoute from "./routes/root.js";
import userRoutes from "./routes/user.routes.js";
import connectDatabase from "./config/db.js";

// dotenv config
dotenv.config();

// database connection
connectDatabase();

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/", rootRoute);
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`APP is running on port ${PORT}`.bgMagenta.black);
});

//fizz.oncemore
