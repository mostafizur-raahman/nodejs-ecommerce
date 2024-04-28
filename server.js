import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());
app.use(express.urlencoded());
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(
        `APP is running on port ${PORT} on ${process.env.NODE_ENV}`.bgMagenta
            .black
    );
});

//fizz.oncemore
